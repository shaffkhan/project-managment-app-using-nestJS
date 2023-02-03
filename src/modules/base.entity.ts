import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn({//timestamp at time of creation
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @UpdateDateColumn({//timestamp at time of updation
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  }