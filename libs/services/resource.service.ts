import { Model  } from "mongoose";
import{AuditModel} from 'tool/models/audit.model';

export class ResourceService <T extends any, C extends any, U extends any>{

    constructor (protected readonly mongoModel:Model<T>){}

    //C:create dto
    //U:Update dto
    //T:model dto

    async create(model:C): Promise<T>{
        const audit=new AuditModel();
        audit.active=true;
        audit.createdBy ='admin';
        audit.createdDate= new Date();
   
        const createdModel = new  this.mongoModel({...model,...audit});
   
        return await createdModel.save();
   
    }
   
    async findAll() :Promise<T[]>{
        return await this.mongoModel.find().exec();
   
   }
   
   async findOne(id:string) :Promise<T[]>{
       return await this.mongoModel.find({_id:id}).exec();
   
   }
   
   async delete(id:string):Promise<T>{
       return await this.mongoModel.findByIdAndRemove({_id: id}).exec();
   }
   
   async update(id:string,dto:U):Promise<T>{
       let newModel=this.mongoModel.findOne({_id:id}).exec();
       newModel={...newModel, ...dto};
   
       return await this.mongoModel.findByIdAndUpdate(id,newModel,{new:true}).exec();
   }

}