package org.example;

import org.example.models.CommodityRecord;

import javax.jws.WebService;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@WebService(endpointInterface = "org.example.CommoditySOAPInterface")
public class CommodityWS implements CommoditySOAPInterface {
    private List<CommodityRecord> records;

    public CommodityWS(List<CommodityRecord> records) {
        this.records = records;
    }

    @Override
    public CommodityRecord[] getCommodities(Date from, Date to) {
        Calendar cal = Calendar.getInstance();

        return records.stream().filter(record -> {
            cal.set(record.year, record.month - 1, 1, 0, 0, 0);
            Date recordDate = cal.getTime();
            return !recordDate.before(from) && !recordDate.after(to);
        }).toArray(CommodityRecord[]::new);
    }
}
