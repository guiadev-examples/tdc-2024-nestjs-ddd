import { BaseSequencialIDEntity } from "@infra/database/base.entities";
import { Entity } from "typeorm";

@Entity({
    name: 'sold_product',
  })
export class Product extends BaseSequencialIDEntity {
    
}