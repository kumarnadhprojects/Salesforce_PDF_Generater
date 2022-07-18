public with sharing class sendEmail {
    @AuraEnabled
    public static string setsendEmail(String pdfBody, string email, string uploadFname){
        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.setContentType('application/pdf');
        attach.setFileName(uploadFname);
		attach.setBody(invoicePDF);

        list<Messaging.singleEmailMessage> mails=new list<Messaging.SingleEmailMessage>();
        Messaging.singleEmailMessage mail=new Messaging.SingleEmailMessage();
        list<String> toadd=new List<String>{email};

        mail.setFileAttachments(new Messaging.EmailFileAttachment[] { attach });
        mail.setToAddresses(toadd);
        mail.setSubject('Pdf Report');
        mail.setPlainTextBody('Chart as PDF Attachment');
        mails.add(mail);
        messaging.sendEmail(mails);
        return null;
    }
}