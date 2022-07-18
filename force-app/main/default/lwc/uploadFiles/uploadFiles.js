import { LightningElement,api} from 'lwc';
import setsendEmail from '@salesforce/apex/sendEmail.setsendEmail';

export default class UploadFiles extends LightningElement {
    @api
    myRecordId;
    uploadFilename;
    emailId;
    body = 'Test Email';

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleClick(){
        // alert(this.uploadFilename+':'+this.emailId);
        setsendEmail({pdfBody: this.body, email: this.emailId, uploadFname: this.uploadFilename})
        .then(result=>{
            alert('Email Send Successfully');
        })
        .catch(error=>{
            alert('Error is: '+error);
        })
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        this.uploadFilename = uploadedFiles[0].name;
        // console.log(JSON.stringify(uploadedFiles[0].name));
        // alert('No. of files uploaded : ' + uploadedFiles.length);
    }

    handleChange(event){
        this.emailId = event.target.value;
    }
}