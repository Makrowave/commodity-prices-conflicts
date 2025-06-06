import type {Conflict} from "~/const/models";
import {Box, Button, Checkbox, FormControlLabel, Tooltip} from "@mui/material";
import {useState, useEffect, type MouseEvent, type Dispatch, type SetStateAction} from "react";
import {useToggledConflicts} from "~/graph/toggled-timelines";
import {calculateWidth, legendWidth, monthUILength} from "~/const/layout-consts";


const conflictHeight = 8  // Height of each conflict bar
const conflictSpacing = 16  // Vertical spacing between conflicts

type TimelineProps = {
  conflicts: Conflict[]
  timeframeStart: Date
  timeframeEnd: Date
}

type ConflictTimelineProps = {
  conflict: Conflict
  timeframeStart: Date
  timeframeEnd: Date
  rowIndex: number
}

type HideButtonsProps = {
  conflicts: Conflict[];
  setHiddenConflicts: Dispatch<SetStateAction<Conflict[]>>;
}


export default function Timeline({conflicts, timeframeStart, timeframeEnd}: TimelineProps) {

  const filterWithTimeframe = (conflicts: Conflict[]): Conflict[] => {
    if (conflicts.length === 0) {
      return conflicts;
    }
    const sorted = [...conflicts].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return sorted.filter(conflict => {
      return !(new Date(conflict.start) > timeframeEnd || (conflict.end != null && new Date(conflict.end) < timeframeStart));
    })
  }

  const filterConflicts = (conflicts: Conflict[]) => {

    return conflicts.filter(conflict => !hiddenConflicts.some(c => c.id === conflict.id));
  }

  const months = monthsBetween(timeframeStart, timeframeEnd);

  const timeframeFilteredConflicts = filterWithTimeframe(conflicts);
  // Determine row assignments for conflicts to prevent overlaps
  const [rowAssignments, setRowAssignments] = useState<Map<number, number>>(new Map());

  const [hiddenConflicts, setHiddenConflicts] = useState<Conflict[]>([]);


  // Prepare conflict so they show in the same rows if there is space available
  useEffect(() => {
    const filteredConflicts = filterConflicts(conflicts)

    const assignments: Map<number, number> = new Map();
    const rowsUsed: Array<{ conflict: Conflict, end: Date | null, rowIndex: number }> = [];

    filteredConflicts.forEach((conflict) => {
      // Find the first row without overlap
      let rowIndex = 0;
      let foundRow = false;

      while (!foundRow) {
        foundRow = true;

        // Check overlapping
        for (const rowConflict of rowsUsed) {
          if (rowConflict.rowIndex === rowIndex) {
            if (conflictsOverlap(
              conflict,
              rowConflict.conflict,
              timeframeEnd
            )) {
              foundRow = false;
              break;
            }
          }
        }

        if (foundRow) {
          assignments.set(conflict.id, rowIndex);
          rowsUsed.push({
            conflict,
            end: conflict.end,
            rowIndex
          });
        } else {
          rowIndex++;
        }
      }
    });

    setRowAssignments(assignments);
  }, [conflicts, timeframeStart, timeframeEnd, hiddenConflicts]);

  const maxRow = rowAssignments.size > 0
    ? Math.max(...Array.from(rowAssignments.values()))
    : 0;

  return (
    <>
      <Box
        sx={{
          py: 2,
          ml: `${legendWidth + 2 * monthUILength + 20.4}px`,
          width: monthUILength * months,
          position: "relative",
          height: (maxRow + 1) * (conflictHeight + conflictSpacing),
        }}
      >
        {/* Vertical lines */}
        {Array.from({length: months}, (_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: -40,
              bottom: 0,
              left: i * monthUILength,
              borderLeft: "1px solid #ddd",
              zIndex: 0,
            }}
          />
        ))}

        {/* Conflict components */}
        {filterConflicts(timeframeFilteredConflicts).map((conflict) => {
          if (
            conflict.start > timeframeEnd ||
            (conflict.end != null && conflict.end < timeframeStart)
          ) {
            return null;
          }

          return (
            <ConflictTimeline
              key={conflict.id}
              conflict={conflict}
              timeframeStart={timeframeStart}
              timeframeEnd={timeframeEnd}
              rowIndex={rowAssignments.get(conflict.id) || 0}
            />
          );
        })}
      </Box>

      <HideButtons
        conflicts={timeframeFilteredConflicts}
        setHiddenConflicts={setHiddenConflicts}
      />
    </>

  )
}

function ConflictTimeline({conflict, timeframeStart, timeframeEnd, rowIndex}: ConflictTimelineProps) {
  const startedBeforeTimeframe = conflict.start < timeframeStart;
  const endedAfterTimeframe = !conflict.end || conflict.end > timeframeEnd;

  const startDate = startedBeforeTimeframe ? timeframeStart : conflict.start;
  const left = startedBeforeTimeframe ? 0 : monthUILength * monthsBetween(timeframeStart, conflict.start);

  const endDate = endedAfterTimeframe ? timeframeEnd : (conflict.end ?? new Date());

  const width = monthUILength * monthsBetween(startDate, endDate);

  const top = rowIndex * (conflictHeight + conflictSpacing);

  const [position, setPosition] = useState<{ x: undefined | number, y: undefined | number }>({
    x: undefined,
    y: undefined
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    // Calculate position considering scroll offsets
    const containerElement = e.currentTarget.closest('.scrollable-container') as HTMLElement;
    const scrollLeft = containerElement ? containerElement.scrollLeft : 0;

    // Get the position relative to the viewport
    const x = e.clientX + scrollLeft;
    const y = e.clientY;

    setPosition({x, y});
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Tooltip
      open={isOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      slotProps={{
        popper: {
          anchorEl: {
            clientHeight: 0,
            clientWidth: 0,
            // @ts-ignore
            getBoundingClientRect: () => ({
              top: position.y ?? 0,
              left: position.x ?? 0,
              right: position.x ?? 0,
              bottom: position.y ?? 0,
              width: 0,
              height: 0,
            })
          },
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8], // Small offset from cursor
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                altAxis: true,
              },
            }
          ]
        }
      }}
      title={
        <>
          {`${conflict.name}`}
          <br/>
          {`Started: ${formatDate(conflict.start)}`}
          <br/>
          {!conflict.end ? "Ongoing" : `Ended: ${formatDate(conflict.end)}`}
        </>
      }
    >
      <Box
        sx={{
          position: 'absolute',
          borderBottomLeftRadius: startedBeforeTimeframe && width !== 0 ? 0 : 4,
          borderTopLeftRadius: startedBeforeTimeframe && width !== 0 ? 0 : 4,
          borderBottomRightRadius: endedAfterTimeframe && width !== 0 ? 0 : 4,
          borderTopRightRadius: endedAfterTimeframe && width !== 0 ? 0 : 4,
          bgcolor: colors[conflict.id % colors.length],
          left: left,
          top: top,
          height: conflictHeight,
          width: width === 0 ? 9 : width,
          transform: width === 0 ? 'translate(-4px, 0px)' : '',
          '&:hover': {
            cursor: 'pointer',
            filter: 'brightness(1.1)',
          }
        }}
      />
    </Tooltip>
  );
}

function HideButtons({conflicts, setHiddenConflicts}: HideButtonsProps) {

  const {hiddenConflicts, toggleConflict} = useToggledConflicts();
  const [localHidden, setLocalHidden] = useState<Conflict[]>([]);
  const [global, setGlobal] = useState<boolean>(true);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (global) {
      setHiddenConflicts(hiddenConflicts);
    }
  }, [hiddenConflicts]);

  const handleClick = (conflict: Conflict) => {
    if (global) {
      toggleConflict(conflict);
      return;
    }
    if (localHidden.some((c) => c.id === conflict.id)) {
      setLocalHidden((prev) => (prev.filter((c) => c.id !== conflict.id)));
      setHiddenConflicts((prev) => (prev.filter((c) => c.id !== conflict.id)))
    } else {
      setLocalHidden((prev) => [...prev, conflict]);
      setHiddenConflicts(((prev) => [...prev, conflict]));
    }
  }

  const handleToggle = () => {
    if (global) {
      console.log(hiddenConflicts);
      setHiddenConflicts(localHidden);
    } else {
      console.log(localHidden);
      setHiddenConflicts(hiddenConflicts);
    }
    setGlobal(!global);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        position: 'sticky',
        left: 0,
        backgroundColor: 'white',
        zIndex: 2,
      }}
    >
      <Box sx={{width: calculateWidth(width - 16), overflowX: 'auto', whiteSpace: 'nowrap', pb: 2, pr: 2}}>
        <Box sx={{display: 'inline-flex', gap: 1}}>
          {
            conflicts.map((conflict) => (
              <Button variant={"contained"} key={conflict.id} sx={{
                bgcolor: (global ? hiddenConflicts : localHidden).some((c) => c.id === conflict.id) ? "#888888" : colors[conflict.id % colors.length]
              }}
                      onClick={() => handleClick(conflict)}
              >
                {conflict.name}
              </Button>
            ))
          }
        </Box>
      </Box>
      <FormControlLabel control={<Checkbox checked={global} onChange={handleToggle}/>}
                        label="Toggle on all charts"/>
    </Box>
  )
}


export const monthsBetween = (date1: Date, date2: Date): number => {
  if (date1 > date2) {
    return 0;
  }

  const years = date2.getFullYear() - date1.getFullYear();
  const months = date2.getMonth() - date1.getMonth();

  return years * 12 + months;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
}

const conflictsOverlap = (
  a: Conflict,
  b: Conflict,
  timeframeEnd: Date
): boolean => {
  const effectiveEndA = a.end || timeframeEnd;
  const effectiveEndB = b.end || timeframeEnd;

  return a.start <= effectiveEndB && b.start <= effectiveEndA;
};

const colors = [
  "#FF1744", // Vibrant Red
  "#00E676", // Vibrant Green
  "#FFEA00", // Vibrant Yellow
  "#2979FF", // Vibrant Blue
  "#FF9100", // Vibrant Orange
  "#AA00FF", // Vibrant Purple
  "#00E5FF", // Vibrant Cyan
  "#F50057", // Vibrant Pink/Magenta
  "#C6FF00", // Vibrant Lime
  "#FF80AB", // Vibrant Light Pink
  "#00B8D4", // Vibrant Teal
  "#D500F9", // Vibrant Fuchsia
  "#FF6D00", // Vibrant Deep Orange
  "#FFFF00", // Vibrant Bright Yellow
  "#76FF03", // Vibrant Light Green
  "#FF3D00", // Vibrant Deep Red
  "#1DE9B6", // Vibrant Mint
  "#00B0FF", // Vibrant Light Blue
  "#651FFF", // Vibrant Indigo
  "#3D5AFE"  // Vibrant Periwinkle
]