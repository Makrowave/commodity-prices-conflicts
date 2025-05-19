package org.example;

import org.example.models.CommodityRecord;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import java.util.Date;
import java.util.List;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface CommoditySOAPInterface {
    @WebMethod CommodityRecord[] getCommodities(Date from, Date to);
}
