public with sharing class PdfGenerator
{
	@AuraEnabled
	public static List<Quote__c> getQuoteController(Id fieldId){
		return [SELECT Id, Name, Field1__c, Field2__c, Field3__c, Field4__c FROM Quote__c where Id=:fieldId];
	}
}