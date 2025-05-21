package org.example;

import org.example.models.CommodityRecord;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;
import jakarta.jws.soap.SOAPBinding;
import java.util.Date;
import java.util.List;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface CommoditySOAPInterface {
    @WebMethod CommodityRecord[] getCommodities(Date from, Date to);
}
