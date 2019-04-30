/**
 * Create Flight Transaction
 * @param {org.gowo.network.powerPlant.createPlantJob} plantJobData
 * @transaction
 */

 function createPlantJob(plantJobData){
     return getAssetRegistry('org.gowo.network.powerPlant.PowerPlant')
     .then(function(plantRegistry){

         var factory = getFactory();
         var NS = 'org.gowo.network.powerPlant';

         var PPJID = generatePPJID(plantJobData.jobName, 
            plantJobData.jobDeadline);
         var PJOB = factory.newResource(NS, 'PowerPlant', PPJID);

         PJOB.tenderDescription = plantJobData.tenderDescription;
         PJOB.jobName = plantJobData.jobName;
         PJOB.jobType = plantJobData.jobType;
         PJOB.jobStatus = plantJobData.jobStatus;
         PJOB.jobDeadline = plantJobData.jobDeadline;
         PJOB.extraNotes = plantJobData.extraNotes;
         
         PJOB.Officers = [plantJobData.OfficerID];
         
         var event = factory.newEvent(NS, 'jobCreated');
         event.PPJID = PPJID;
         emit(event);

        return plantRegistry.add(PJOB);

     });
 };

 function generatePPJID(jobName, jobDeadline){
   var dt = new Date(jobDeadline)

   var month = dt.getMonth()+1;
   if((month+'').length == 1)  month = '0'+month;
   var dayNum = dt.getDate();
   if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

   return jobName+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);
}