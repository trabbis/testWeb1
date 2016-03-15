package com.duksun;
/****************************************************************************************
 * $RCSfile: eclipse-codetemplates.xml,v $  $Revision: 1.4 $  $Date: 2014/10/10 20:48:18 $
 * Copyright 2008,2014 All rights reserved. NBS Payment Solutions Inc.
 *
 ****************************************************************************************/


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * @author dchoi@nbsps.com
 *
 */

@Controller
public class WebSocketTestController {
    
    //end point. (like requestMapping in controller) 
    // you can add setApplicationDestinationPrefixes in front of this
    @MessageMapping("/pushchannel")  
    @SendTo("/queue/test1")   //subscribe, enableSimpleBroker, 
    public String requestMsg(String str) throws Exception {
        //Thread.sleep(3000); // simulated delay
        //return new Greeting("Hello, " + message.getName() + "!");
        return "testing";//ResourceResponse.createSuccessfulResponse();
        
    }
    
//    <websocket:message-broker application-destination-prefix="/app">
//    <websocket:stomp-endpoint path="/pushchannel"/>
//    <websocket:stomp-broker-relay relay-host="localhost" relay-port="61613" prefix="/queue, /topic"/>
//</websocket:message-broker>

    
}
