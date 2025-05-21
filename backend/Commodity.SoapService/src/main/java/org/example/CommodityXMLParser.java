package org.example;

import org.example.models.CommodityRecord;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.*;

public class CommodityXMLParser {

    public static List<CommodityRecord> parse(File xmlFile) throws Exception {
        List<CommodityRecord> records = new ArrayList<>();

        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(xmlFile);
        NodeList recordNodes = doc.getElementsByTagName("record");

        for (int i = 0; i < recordNodes.getLength(); i++) {
            Element recordElement = (Element) recordNodes.item(i);
            CommodityRecord record = new CommodityRecord();

            record.date = getText(recordElement, "date");
            record.year = Integer.parseInt(getText(recordElement, "year"));
            record.month = Integer.parseInt(getText(recordElement, "month"));

            NodeList children = recordElement.getChildNodes();
            for (int j = 0; j < children.getLength(); j++) {
                if (children.item(j).getNodeType() == Node.ELEMENT_NODE) {
                    Element e = (Element) children.item(j);
                    String tag = e.getTagName();
                    if (!Set.of("date", "year", "month").contains(tag)) {
                        String val = e.getTextContent().trim().replace(",", ".");
                        if (!val.isEmpty()) {
                            try {
                                double parsed = Double.parseDouble(val);
                                record.values.put(tag, parsed);
                            } catch (NumberFormatException ignored) {
                            }
                        }
                    }
                }
            }
            records.add(record);
        }

        return records;
    }

    private static String getText(Element parent, String tag) {
        NodeList nodes = parent.getElementsByTagName(tag);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent().trim() : "";
    }
}