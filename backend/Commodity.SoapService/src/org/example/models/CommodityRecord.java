package org.example.models;

import java.util.HashMap;
import java.util.Map;

public class CommodityRecord {
    public String date;
    public int year;
    public int month;
    public Map<String, Double> values = new HashMap<>();
}
