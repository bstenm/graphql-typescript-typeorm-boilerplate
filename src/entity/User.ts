import * as uuidv4 from 'uuid/v4';
import {Entity, PrimaryColumn, Column, BeforeInsert, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", { length: 255 })
    email: string;

    @Column("varchar")
    password: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }

}
