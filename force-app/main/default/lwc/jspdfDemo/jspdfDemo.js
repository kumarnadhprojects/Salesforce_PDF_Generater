import {LightningElement,api} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf';
import getQuote from '@salesforce/apex/PdfGenerator.getQuoteController';

export default class JspdfDemo extends LightningElement {
   @api recordId; 
   quoteList = [];

    headers = this.createHeaders([
        "Id",
        "Name",
        "Field1__c",
        "Field2__c",
        "Field3__c",
        "Field4__c"
    ]);

    renderedCallback() {
        Promise.all([
            loadScript(this, JSPDF)
        ]);
    }
// Generate PDF Logic
    generatePdf(){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Hi Please find below the details", 20, 20);
        doc.table(30, 30, this.quoteList, this.headers, { autosize:true });
        doc.save("Quote.pdf");
    }

    generateData(){
       getQuote({fieldId:this.recordId}).then(result=>{
            this.quoteList = result;
            this.generatePdf();
        });
    }

    createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 37,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

}