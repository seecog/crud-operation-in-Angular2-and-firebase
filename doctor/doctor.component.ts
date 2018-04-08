import { Component } from '@angular/core';
import {Http,Response} from '@angular/http';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  private docs: any[] =[];
  private id :string;
  private name : string ="";
  private age : number;
  private btn_stt : boolean = true;


constructor(private x : Http){

this.getDoctors();
}

getDoctors(){

  this.x.get('https://employee-f575e.firebaseio.com/doctors.json').subscribe(
    (res : Response)=>{
    let data = res.json();
    let keys = Object.keys(data);
    console.log('The keys is ',keys);
    
    this.docs = keys.map(function(x){
    return {key : x,record : data[x]};    
    });
    
    console.log('The doctor list is ',this.docs)
    },
    (error)=>{
    console.log('The error is ',error)
    }
    
    )
    
}

      deleteDoctor(key){
       this.x.delete('https://employee-f575e.firebaseio.com/doctors/'+key+'.json').subscribe(
(res : Response)=>{
  console.log('Record deleted')
  this.getDoctors();
},
(error)=>{
  console.log('Error is ',error)
}

       )
      }

      saveDoctor(){
        var doc = {
          name: this.name,
          age:this.age
        }

this.x.post('https://employee-f575e.firebaseio.com/doctors.json',doc).subscribe(
  (res : Response)=>{
console.log('record saved')
this.getDoctors();
  },
  (error)=>{
console.log('The error is ',error)
  }
)


        }

        editDoctor(data : any){
          this.btn_stt = false;
          this.id = data.key;
          this.name = data.record.name;
          this.age = data.record.age;
        }

        updateDoctor(){
          var doc = {
            name: this.name,
            age:this.age
          }
          this.x.put('https://employee-f575e.firebaseio.com/doctors/'+this.id+'.json',doc).subscribe(
(res:Response)=>{
  console.log('Updated')
  this.getDoctors();
},
(err)=>{
  console.log('The error is ',err)
}

          )
        }
}
















