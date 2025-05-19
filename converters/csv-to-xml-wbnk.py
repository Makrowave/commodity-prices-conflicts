import pandas as pd
import xml.etree.ElementTree as ET
import sys
import re
from pathlib import Path
from xml.dom import minidom

def sanitize_tag(tag):
    tag = str(tag).strip().replace('\n', ' ').replace('\r', ' ')
    tag = re.sub(r'\s+', '_', tag)
    tag = re.sub(r'[^a-zA-Z0-9_.-]', '', tag)
    return tag if tag else "unknown"

def csv_to_structured_xml(csv_file, output_file=None):
    df = pd.read_csv(csv_file)

    df = df.loc[:, ~df.columns.str.contains('^Unnamed|^\\s*$', na=False)]
    df = df.dropna(axis=1, how='all')

    df.columns = [sanitize_tag(col) for col in df.columns]

    descriptions = df.iloc[0]
    data_df = df.iloc[3:].reset_index(drop=True)
    data_df.columns = df.columns

    root = ET.Element("data")

    meta_elem = ET.SubElement(root, "meta")
    for col in df.columns:
        desc = str(descriptions[col]).strip().replace('\n', ' ') if pd.notna(descriptions[col]) else ""
        desc_elem = ET.SubElement(meta_elem, "description", column=col)
        desc_elem.text = desc

    records_elem = ET.SubElement(root, "records")
    for _, row in data_df.iterrows():
        record_elem = ET.SubElement(records_elem, "record")
        raw_date = str(row[df.columns[0]]).strip()
        date_elem = ET.SubElement(record_elem, "date")
        date_elem.text = raw_date

        match = re.match(r"(\d{4})M(\d{1,2})", raw_date)
        if match:
            year_val, month_val = match.groups()
            ET.SubElement(record_elem, "year").text = year_val
            ET.SubElement(record_elem, "month").text = month_val.zfill(2)

        for col in df.columns[1:]:
            tag = sanitize_tag(col)
            val = str(row[col]).strip().replace('\n', ' ') if pd.notna(row[col]) else ""
            val_elem = ET.SubElement(record_elem, tag)
            val_elem.text = val

    rough_string = ET.tostring(root, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="  ")

    output_file = Path(output_file) if output_file else Path(csv_file).with_suffix(".xml")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(pretty_xml)

csv_to_structured_xml("./commodities.csv", "./commodities.xml")
