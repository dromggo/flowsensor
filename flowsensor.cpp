#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
  
const char* ssid = "Red Wifi";
const char* password =  "secreto";

double flow;
int flowsensor = 18; 
unsigned long pulse_freq;

  
void setup() {
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  delay(1000);
  initFlowsensor();
}
  
void loop() {
  double flow = getFlow();
  if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
    HTTPClient http;
    http.begin("http://3.144.143.253:3000/flow"); //Specify the URL
    http.addHeader("Content-Type", "application/json");
    String chunk1 = String("{\"value\":");
    String chunk2 = String(",\"deviceId\": \"34:56:D5:F1:AC\"}");
    int httpCode = http.POST(chunk1 + flow + chunk2);
    if (httpCode > 0) { //Check for the returning code
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);
      }
    else {
      Serial.println("Error on HTTP request");
    }
    http.end(); //Free the resources
  }
  delay(10000);
}

void IRAM_ATTR pulse() {
   pulse_freq++;
}

void initFlowsensor() {
  Serial.println("Setting up flowsensor...");
  pinMode(flowsensor, INPUT_PULLUP);
  attachInterrupt(flowsensor, pulse, RISING);
  Serial.println("Flowsensor ready");
}

double getFlow() {
  flow = (pulse_freq / 7.5); 
  pulse_freq = 0; // Reset Counter
  Serial.print(flow, DEC); 
  Serial.println(" L/Min");
  return flow;
}