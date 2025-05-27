package org.example;

import org.example.models.CommodityRecord;
import java.io.File;
import java.util.List;
import jakarta.xml.ws.Endpoint;

public class Main {
    public static void main(String[] args) throws Exception {
        File xmlFile = new File("commodities.xml");
        List<CommodityRecord> records = CommodityXMLParser.parse(xmlFile);

        Endpoint.publish("http://0.0.0.0:8080/Commodity", new CommodityWS(records));
    }
}