var reporterLastName = context.entities.entReporterLastNameComposite?.entReporterLastName?  context.entities.entReporterLastNameComposite?.entReporterLastName? : " ";
koreDebugger.log(reporterName)

if(reporterName && reporterName.length != 0 && reporterName.split(" ").length <= 1){
    koreDebugger.log("PARTIAL NAME CAPTURED :::::")
    context.reporterPath = "PARTIALNAME"
}

koreDebugger.log("FULL NAME CAPTURED :::::")