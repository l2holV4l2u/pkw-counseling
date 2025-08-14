import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','updatedAt','role','title','firstName','lastName','studentId','profileUrl','schoolYear','seatNumber','roomId','homeroomId']);

export const RoomScalarFieldEnumSchema = z.enum(['id','label','grade','roomNo']);

export const TGATScoreScalarFieldEnumSchema = z.enum(['id','userId','tgat1','tgat2','tgat3']);

export const TPATScoreScalarFieldEnumSchema = z.enum(['id','userId','tpat1','tpat2','tpat3','tpat4','tpat5']);

export const ALevelScoreScalarFieldEnumSchema = z.enum(['id','userId','alevel61','alevel62','alevel63','alevel64','alevel65','alevel66','alevel70','alevel81','alevel82','alevel83','alevel84','alevel85','alevel86','alevel87','alevel88','alevel89']);

export const UniChoiceScalarFieldEnumSchema = z.enum(['id','userId','programId','order']);

export const EmailVerificationScalarFieldEnumSchema = z.enum(['id','email','otp','expiresAt','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date(),
  role: z.string(),
  title: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  studentId: z.string().nullable(),
  profileUrl: z.string().nullable(),
  schoolYear: z.string().nullable(),
  seatNumber: z.number().int().nullable(),
  roomId: z.string().nullable(),
  homeroomId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  room?: RoomWithRelations | null;
  homeroom?: RoomWithRelations | null;
  tgatScore?: TGATScoreWithRelations | null;
  tpatScore?: TPATScoreWithRelations | null;
  alevelScore?: ALevelScoreWithRelations | null;
  uniChoices: UniChoiceWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  room: z.lazy(() => RoomWithRelationsSchema).nullable(),
  homeroom: z.lazy(() => RoomWithRelationsSchema).nullable(),
  tgatScore: z.lazy(() => TGATScoreWithRelationsSchema).nullable(),
  tpatScore: z.lazy(() => TPATScoreWithRelationsSchema).nullable(),
  alevelScore: z.lazy(() => ALevelScoreWithRelationsSchema).nullable(),
  uniChoices: z.lazy(() => UniChoiceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const RoomSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
})

export type Room = z.infer<typeof RoomSchema>

// ROOM RELATION SCHEMA
//------------------------------------------------------

export type RoomRelations = {
  users: UserWithRelations[];
  homeroomTeacher?: UserWithRelations | null;
};

export type RoomWithRelations = z.infer<typeof RoomSchema> & RoomRelations

export const RoomWithRelationsSchema: z.ZodType<RoomWithRelations> = RoomSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
  homeroomTeacher: z.lazy(() => UserWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// TGAT SCORE SCHEMA
/////////////////////////////////////////

export const TGATScoreSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  tgat1: z.number().int().nullable(),
  tgat2: z.number().int().nullable(),
  tgat3: z.number().int().nullable(),
})

export type TGATScore = z.infer<typeof TGATScoreSchema>

// TGAT SCORE RELATION SCHEMA
//------------------------------------------------------

export type TGATScoreRelations = {
  user: UserWithRelations;
};

export type TGATScoreWithRelations = z.infer<typeof TGATScoreSchema> & TGATScoreRelations

export const TGATScoreWithRelationsSchema: z.ZodType<TGATScoreWithRelations> = TGATScoreSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// TPAT SCORE SCHEMA
/////////////////////////////////////////

export const TPATScoreSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  tpat1: z.number().int().nullable(),
  tpat2: z.number().int().nullable(),
  tpat3: z.number().int().nullable(),
  tpat4: z.number().int().nullable(),
  tpat5: z.number().int().nullable(),
})

export type TPATScore = z.infer<typeof TPATScoreSchema>

// TPAT SCORE RELATION SCHEMA
//------------------------------------------------------

export type TPATScoreRelations = {
  user: UserWithRelations;
};

export type TPATScoreWithRelations = z.infer<typeof TPATScoreSchema> & TPATScoreRelations

export const TPATScoreWithRelationsSchema: z.ZodType<TPATScoreWithRelations> = TPATScoreSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// A LEVEL SCORE SCHEMA
/////////////////////////////////////////

export const ALevelScoreSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  alevel61: z.number().int().nullable(),
  alevel62: z.number().int().nullable(),
  alevel63: z.number().int().nullable(),
  alevel64: z.number().int().nullable(),
  alevel65: z.number().int().nullable(),
  alevel66: z.number().int().nullable(),
  alevel70: z.number().int().nullable(),
  alevel81: z.number().int().nullable(),
  alevel82: z.number().int().nullable(),
  alevel83: z.number().int().nullable(),
  alevel84: z.number().int().nullable(),
  alevel85: z.number().int().nullable(),
  alevel86: z.number().int().nullable(),
  alevel87: z.number().int().nullable(),
  alevel88: z.number().int().nullable(),
  alevel89: z.number().int().nullable(),
})

export type ALevelScore = z.infer<typeof ALevelScoreSchema>

// A LEVEL SCORE RELATION SCHEMA
//------------------------------------------------------

export type ALevelScoreRelations = {
  user: UserWithRelations;
};

export type ALevelScoreWithRelations = z.infer<typeof ALevelScoreSchema> & ALevelScoreRelations

export const ALevelScoreWithRelationsSchema: z.ZodType<ALevelScoreWithRelations> = ALevelScoreSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// UNI CHOICE SCHEMA
/////////////////////////////////////////

export const UniChoiceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  programId: z.string(),
  order: z.number().int(),
})

export type UniChoice = z.infer<typeof UniChoiceSchema>

// UNI CHOICE RELATION SCHEMA
//------------------------------------------------------

export type UniChoiceRelations = {
  user: UserWithRelations;
};

export type UniChoiceWithRelations = z.infer<typeof UniChoiceSchema> & UniChoiceRelations

export const UniChoiceWithRelationsSchema: z.ZodType<UniChoiceWithRelations> = UniChoiceSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// EMAIL VERIFICATION SCHEMA
/////////////////////////////////////////

export const EmailVerificationSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  otp: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type EmailVerification = z.infer<typeof EmailVerificationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
  homeroom: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
  tgatScore: z.union([z.boolean(),z.lazy(() => TGATScoreArgsSchema)]).optional(),
  tpatScore: z.union([z.boolean(),z.lazy(() => TPATScoreArgsSchema)]).optional(),
  alevelScore: z.union([z.boolean(),z.lazy(() => ALevelScoreArgsSchema)]).optional(),
  uniChoices: z.union([z.boolean(),z.lazy(() => UniChoiceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  uniChoices: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.boolean().optional(),
  title: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  studentId: z.boolean().optional(),
  profileUrl: z.boolean().optional(),
  schoolYear: z.boolean().optional(),
  seatNumber: z.boolean().optional(),
  roomId: z.boolean().optional(),
  homeroomId: z.boolean().optional(),
  room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
  homeroom: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
  tgatScore: z.union([z.boolean(),z.lazy(() => TGATScoreArgsSchema)]).optional(),
  tpatScore: z.union([z.boolean(),z.lazy(() => TPATScoreArgsSchema)]).optional(),
  alevelScore: z.union([z.boolean(),z.lazy(() => ALevelScoreArgsSchema)]).optional(),
  uniChoices: z.union([z.boolean(),z.lazy(() => UniChoiceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROOM
//------------------------------------------------------

export const RoomIncludeSchema: z.ZodType<Prisma.RoomInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  homeroomTeacher: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoomArgsSchema: z.ZodType<Prisma.RoomDefaultArgs> = z.object({
  select: z.lazy(() => RoomSelectSchema).optional(),
  include: z.lazy(() => RoomIncludeSchema).optional(),
}).strict();

export const RoomCountOutputTypeArgsSchema: z.ZodType<Prisma.RoomCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoomCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const RoomSelectSchema: z.ZodType<Prisma.RoomSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  grade: z.boolean().optional(),
  roomNo: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  homeroomTeacher: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TGAT SCORE
//------------------------------------------------------

export const TGATScoreIncludeSchema: z.ZodType<Prisma.TGATScoreInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TGATScoreArgsSchema: z.ZodType<Prisma.TGATScoreDefaultArgs> = z.object({
  select: z.lazy(() => TGATScoreSelectSchema).optional(),
  include: z.lazy(() => TGATScoreIncludeSchema).optional(),
}).strict();

export const TGATScoreSelectSchema: z.ZodType<Prisma.TGATScoreSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tgat1: z.boolean().optional(),
  tgat2: z.boolean().optional(),
  tgat3: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TPAT SCORE
//------------------------------------------------------

export const TPATScoreIncludeSchema: z.ZodType<Prisma.TPATScoreInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TPATScoreArgsSchema: z.ZodType<Prisma.TPATScoreDefaultArgs> = z.object({
  select: z.lazy(() => TPATScoreSelectSchema).optional(),
  include: z.lazy(() => TPATScoreIncludeSchema).optional(),
}).strict();

export const TPATScoreSelectSchema: z.ZodType<Prisma.TPATScoreSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tpat1: z.boolean().optional(),
  tpat2: z.boolean().optional(),
  tpat3: z.boolean().optional(),
  tpat4: z.boolean().optional(),
  tpat5: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// A LEVEL SCORE
//------------------------------------------------------

export const ALevelScoreIncludeSchema: z.ZodType<Prisma.ALevelScoreInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ALevelScoreArgsSchema: z.ZodType<Prisma.ALevelScoreDefaultArgs> = z.object({
  select: z.lazy(() => ALevelScoreSelectSchema).optional(),
  include: z.lazy(() => ALevelScoreIncludeSchema).optional(),
}).strict();

export const ALevelScoreSelectSchema: z.ZodType<Prisma.ALevelScoreSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  alevel61: z.boolean().optional(),
  alevel62: z.boolean().optional(),
  alevel63: z.boolean().optional(),
  alevel64: z.boolean().optional(),
  alevel65: z.boolean().optional(),
  alevel66: z.boolean().optional(),
  alevel70: z.boolean().optional(),
  alevel81: z.boolean().optional(),
  alevel82: z.boolean().optional(),
  alevel83: z.boolean().optional(),
  alevel84: z.boolean().optional(),
  alevel85: z.boolean().optional(),
  alevel86: z.boolean().optional(),
  alevel87: z.boolean().optional(),
  alevel88: z.boolean().optional(),
  alevel89: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// UNI CHOICE
//------------------------------------------------------

export const UniChoiceIncludeSchema: z.ZodType<Prisma.UniChoiceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UniChoiceArgsSchema: z.ZodType<Prisma.UniChoiceDefaultArgs> = z.object({
  select: z.lazy(() => UniChoiceSelectSchema).optional(),
  include: z.lazy(() => UniChoiceIncludeSchema).optional(),
}).strict();

export const UniChoiceSelectSchema: z.ZodType<Prisma.UniChoiceSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  programId: z.boolean().optional(),
  order: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EMAIL VERIFICATION
//------------------------------------------------------

export const EmailVerificationSelectSchema: z.ZodType<Prisma.EmailVerificationSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  otp: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  schoolYear: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seatNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  homeroomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  room: z.union([ z.lazy(() => RoomNullableScalarRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
  homeroom: z.union([ z.lazy(() => RoomNullableScalarRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
  tgatScore: z.union([ z.lazy(() => TGATScoreNullableScalarRelationFilterSchema),z.lazy(() => TGATScoreWhereInputSchema) ]).optional().nullable(),
  tpatScore: z.union([ z.lazy(() => TPATScoreNullableScalarRelationFilterSchema),z.lazy(() => TPATScoreWhereInputSchema) ]).optional().nullable(),
  alevelScore: z.union([ z.lazy(() => ALevelScoreNullableScalarRelationFilterSchema),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional().nullable(),
  uniChoices: z.lazy(() => UniChoiceListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  studentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  schoolYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  homeroomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  room: z.lazy(() => RoomOrderByWithRelationInputSchema).optional(),
  homeroom: z.lazy(() => RoomOrderByWithRelationInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreOrderByWithRelationInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreOrderByWithRelationInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreOrderByWithRelationInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    studentId: z.string(),
    homeroomId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    studentId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    homeroomId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    studentId: z.string(),
    homeroomId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    studentId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    homeroomId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
    studentId: z.string(),
    homeroomId: z.string(),
  }),
  z.object({
    email: z.string(),
    studentId: z.string(),
  }),
  z.object({
    email: z.string(),
    homeroomId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    studentId: z.string(),
    homeroomId: z.string(),
  }),
  z.object({
    studentId: z.string(),
  }),
  z.object({
    homeroomId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  studentId: z.string().optional(),
  homeroomId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  schoolYear: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seatNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  room: z.union([ z.lazy(() => RoomNullableScalarRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
  homeroom: z.union([ z.lazy(() => RoomNullableScalarRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
  tgatScore: z.union([ z.lazy(() => TGATScoreNullableScalarRelationFilterSchema),z.lazy(() => TGATScoreWhereInputSchema) ]).optional().nullable(),
  tpatScore: z.union([ z.lazy(() => TPATScoreNullableScalarRelationFilterSchema),z.lazy(() => TPATScoreWhereInputSchema) ]).optional().nullable(),
  alevelScore: z.union([ z.lazy(() => ALevelScoreNullableScalarRelationFilterSchema),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional().nullable(),
  uniChoices: z.lazy(() => UniChoiceListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  studentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  schoolYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  homeroomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  profileUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  schoolYear: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  seatNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  homeroomId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RoomWhereInputSchema: z.ZodType<Prisma.RoomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grade: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roomNo: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  homeroomTeacher: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const RoomOrderByWithRelationInputSchema: z.ZodType<Prisma.RoomOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  homeroomTeacher: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RoomWhereUniqueInputSchema: z.ZodType<Prisma.RoomWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    grade_roomNo: z.lazy(() => RoomGradeRoomNoCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    grade_roomNo: z.lazy(() => RoomGradeRoomNoCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  grade_roomNo: z.lazy(() => RoomGradeRoomNoCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grade: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  roomNo: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  homeroomTeacher: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const RoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoomOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoomCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoomAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoomMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoomSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  grade: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  roomNo: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TGATScoreWhereInputSchema: z.ZodType<Prisma.TGATScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TGATScoreWhereInputSchema),z.lazy(() => TGATScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TGATScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TGATScoreWhereInputSchema),z.lazy(() => TGATScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tgat1: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tgat2: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tgat3: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TGATScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.TGATScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tgat1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tgat2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tgat3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TGATScoreWhereUniqueInputSchema: z.ZodType<Prisma.TGATScoreWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => TGATScoreWhereInputSchema),z.lazy(() => TGATScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TGATScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TGATScoreWhereInputSchema),z.lazy(() => TGATScoreWhereInputSchema).array() ]).optional(),
  tgat1: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tgat2: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tgat3: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TGATScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.TGATScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tgat1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tgat2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tgat3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TGATScoreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TGATScoreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TGATScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TGATScoreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TGATScoreSumOrderByAggregateInputSchema).optional()
}).strict();

export const TGATScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TGATScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TGATScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => TGATScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TGATScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TGATScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => TGATScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tgat1: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tgat2: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tgat3: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const TPATScoreWhereInputSchema: z.ZodType<Prisma.TPATScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TPATScoreWhereInputSchema),z.lazy(() => TPATScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TPATScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TPATScoreWhereInputSchema),z.lazy(() => TPATScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tpat1: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tpat2: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tpat3: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tpat4: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tpat5: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TPATScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.TPATScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tpat1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TPATScoreWhereUniqueInputSchema: z.ZodType<Prisma.TPATScoreWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => TPATScoreWhereInputSchema),z.lazy(() => TPATScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TPATScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TPATScoreWhereInputSchema),z.lazy(() => TPATScoreWhereInputSchema).array() ]).optional(),
  tpat1: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tpat2: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tpat3: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tpat4: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tpat5: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TPATScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.TPATScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tpat1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tpat5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TPATScoreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TPATScoreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TPATScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TPATScoreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TPATScoreSumOrderByAggregateInputSchema).optional()
}).strict();

export const TPATScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TPATScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TPATScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => TPATScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TPATScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TPATScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => TPATScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tpat1: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tpat2: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tpat3: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tpat4: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tpat5: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ALevelScoreWhereInputSchema: z.ZodType<Prisma.ALevelScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ALevelScoreWhereInputSchema),z.lazy(() => ALevelScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ALevelScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ALevelScoreWhereInputSchema),z.lazy(() => ALevelScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alevel61: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel62: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel63: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel64: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel65: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel66: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel70: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel81: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel82: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel83: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel84: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel85: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel86: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel87: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel88: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  alevel89: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ALevelScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.ALevelScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  alevel61: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel62: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel63: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel64: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel65: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel66: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel70: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel81: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel82: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel83: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel84: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel85: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel86: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel87: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel88: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel89: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ALevelScoreWhereUniqueInputSchema: z.ZodType<Prisma.ALevelScoreWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => ALevelScoreWhereInputSchema),z.lazy(() => ALevelScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ALevelScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ALevelScoreWhereInputSchema),z.lazy(() => ALevelScoreWhereInputSchema).array() ]).optional(),
  alevel61: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel62: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel63: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel64: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel65: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel66: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel70: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel81: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel82: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel83: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel84: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel85: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel86: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel87: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel88: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  alevel89: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ALevelScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.ALevelScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  alevel61: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel62: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel63: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel64: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel65: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel66: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel70: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel81: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel82: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel83: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel84: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel85: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel86: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel87: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel88: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alevel89: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ALevelScoreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ALevelScoreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ALevelScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ALevelScoreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ALevelScoreSumOrderByAggregateInputSchema).optional()
}).strict();

export const ALevelScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ALevelScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ALevelScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ALevelScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ALevelScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ALevelScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ALevelScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  alevel61: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel62: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel63: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel64: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel65: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel66: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel70: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel81: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel82: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel83: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel84: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel85: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel86: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel87: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel88: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  alevel89: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UniChoiceWhereInputSchema: z.ZodType<Prisma.UniChoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UniChoiceWhereInputSchema),z.lazy(() => UniChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UniChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UniChoiceWhereInputSchema),z.lazy(() => UniChoiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UniChoiceOrderByWithRelationInputSchema: z.ZodType<Prisma.UniChoiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UniChoiceWhereUniqueInputSchema: z.ZodType<Prisma.UniChoiceWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => UniChoiceWhereInputSchema),z.lazy(() => UniChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UniChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UniChoiceWhereInputSchema),z.lazy(() => UniChoiceWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UniChoiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.UniChoiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UniChoiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UniChoiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UniChoiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UniChoiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UniChoiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const UniChoiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UniChoiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UniChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => UniChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UniChoiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UniChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => UniChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const EmailVerificationWhereInputSchema: z.ZodType<Prisma.EmailVerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailVerificationWhereInputSchema),z.lazy(() => EmailVerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailVerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailVerificationWhereInputSchema),z.lazy(() => EmailVerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  otp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EmailVerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailVerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailVerificationWhereUniqueInputSchema: z.ZodType<Prisma.EmailVerificationWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => EmailVerificationWhereInputSchema),z.lazy(() => EmailVerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailVerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailVerificationWhereInputSchema),z.lazy(() => EmailVerificationWhereInputSchema).array() ]).optional(),
  otp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const EmailVerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailVerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailVerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailVerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailVerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const EmailVerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailVerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  otp: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomInputSchema).optional(),
  homeroomTeacher: z.lazy(() => UserCreateNestedOneWithoutHomeroomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomInputSchema).optional(),
  homeroomTeacher: z.lazy(() => UserUncheckedCreateNestedOneWithoutHomeroomInputSchema).optional()
}).strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRoomNestedInputSchema).optional(),
  homeroomTeacher: z.lazy(() => UserUpdateOneWithoutHomeroomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomNestedInputSchema).optional(),
  homeroomTeacher: z.lazy(() => UserUncheckedUpdateOneWithoutHomeroomNestedInputSchema).optional()
}).strict();

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int()
}).strict();

export const RoomUpdateManyMutationInputSchema: z.ZodType<Prisma.RoomUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TGATScoreCreateInputSchema: z.ZodType<Prisma.TGATScoreCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tgat1: z.number().int().optional().nullable(),
  tgat2: z.number().int().optional().nullable(),
  tgat3: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTgatScoreInputSchema)
}).strict();

export const TGATScoreUncheckedCreateInputSchema: z.ZodType<Prisma.TGATScoreUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  tgat1: z.number().int().optional().nullable(),
  tgat2: z.number().int().optional().nullable(),
  tgat3: z.number().int().optional().nullable()
}).strict();

export const TGATScoreUpdateInputSchema: z.ZodType<Prisma.TGATScoreUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTgatScoreNestedInputSchema).optional()
}).strict();

export const TGATScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.TGATScoreUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TGATScoreCreateManyInputSchema: z.ZodType<Prisma.TGATScoreCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  tgat1: z.number().int().optional().nullable(),
  tgat2: z.number().int().optional().nullable(),
  tgat3: z.number().int().optional().nullable()
}).strict();

export const TGATScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.TGATScoreUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TGATScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TGATScoreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TPATScoreCreateInputSchema: z.ZodType<Prisma.TPATScoreCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tpat1: z.number().int().optional().nullable(),
  tpat2: z.number().int().optional().nullable(),
  tpat3: z.number().int().optional().nullable(),
  tpat4: z.number().int().optional().nullable(),
  tpat5: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTpatScoreInputSchema)
}).strict();

export const TPATScoreUncheckedCreateInputSchema: z.ZodType<Prisma.TPATScoreUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  tpat1: z.number().int().optional().nullable(),
  tpat2: z.number().int().optional().nullable(),
  tpat3: z.number().int().optional().nullable(),
  tpat4: z.number().int().optional().nullable(),
  tpat5: z.number().int().optional().nullable()
}).strict();

export const TPATScoreUpdateInputSchema: z.ZodType<Prisma.TPATScoreUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTpatScoreNestedInputSchema).optional()
}).strict();

export const TPATScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.TPATScoreUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TPATScoreCreateManyInputSchema: z.ZodType<Prisma.TPATScoreCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  tpat1: z.number().int().optional().nullable(),
  tpat2: z.number().int().optional().nullable(),
  tpat3: z.number().int().optional().nullable(),
  tpat4: z.number().int().optional().nullable(),
  tpat5: z.number().int().optional().nullable()
}).strict();

export const TPATScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.TPATScoreUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TPATScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TPATScoreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ALevelScoreCreateInputSchema: z.ZodType<Prisma.ALevelScoreCreateInput> = z.object({
  id: z.string().uuid().optional(),
  alevel61: z.number().int().optional().nullable(),
  alevel62: z.number().int().optional().nullable(),
  alevel63: z.number().int().optional().nullable(),
  alevel64: z.number().int().optional().nullable(),
  alevel65: z.number().int().optional().nullable(),
  alevel66: z.number().int().optional().nullable(),
  alevel70: z.number().int().optional().nullable(),
  alevel81: z.number().int().optional().nullable(),
  alevel82: z.number().int().optional().nullable(),
  alevel83: z.number().int().optional().nullable(),
  alevel84: z.number().int().optional().nullable(),
  alevel85: z.number().int().optional().nullable(),
  alevel86: z.number().int().optional().nullable(),
  alevel87: z.number().int().optional().nullable(),
  alevel88: z.number().int().optional().nullable(),
  alevel89: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAlevelScoreInputSchema)
}).strict();

export const ALevelScoreUncheckedCreateInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  alevel61: z.number().int().optional().nullable(),
  alevel62: z.number().int().optional().nullable(),
  alevel63: z.number().int().optional().nullable(),
  alevel64: z.number().int().optional().nullable(),
  alevel65: z.number().int().optional().nullable(),
  alevel66: z.number().int().optional().nullable(),
  alevel70: z.number().int().optional().nullable(),
  alevel81: z.number().int().optional().nullable(),
  alevel82: z.number().int().optional().nullable(),
  alevel83: z.number().int().optional().nullable(),
  alevel84: z.number().int().optional().nullable(),
  alevel85: z.number().int().optional().nullable(),
  alevel86: z.number().int().optional().nullable(),
  alevel87: z.number().int().optional().nullable(),
  alevel88: z.number().int().optional().nullable(),
  alevel89: z.number().int().optional().nullable()
}).strict();

export const ALevelScoreUpdateInputSchema: z.ZodType<Prisma.ALevelScoreUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAlevelScoreNestedInputSchema).optional()
}).strict();

export const ALevelScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ALevelScoreCreateManyInputSchema: z.ZodType<Prisma.ALevelScoreCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  alevel61: z.number().int().optional().nullable(),
  alevel62: z.number().int().optional().nullable(),
  alevel63: z.number().int().optional().nullable(),
  alevel64: z.number().int().optional().nullable(),
  alevel65: z.number().int().optional().nullable(),
  alevel66: z.number().int().optional().nullable(),
  alevel70: z.number().int().optional().nullable(),
  alevel81: z.number().int().optional().nullable(),
  alevel82: z.number().int().optional().nullable(),
  alevel83: z.number().int().optional().nullable(),
  alevel84: z.number().int().optional().nullable(),
  alevel85: z.number().int().optional().nullable(),
  alevel86: z.number().int().optional().nullable(),
  alevel87: z.number().int().optional().nullable(),
  alevel88: z.number().int().optional().nullable(),
  alevel89: z.number().int().optional().nullable()
}).strict();

export const ALevelScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.ALevelScoreUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ALevelScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UniChoiceCreateInputSchema: z.ZodType<Prisma.UniChoiceCreateInput> = z.object({
  id: z.string().uuid().optional(),
  programId: z.string(),
  order: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutUniChoicesInputSchema)
}).strict();

export const UniChoiceUncheckedCreateInputSchema: z.ZodType<Prisma.UniChoiceUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  programId: z.string(),
  order: z.number().int()
}).strict();

export const UniChoiceUpdateInputSchema: z.ZodType<Prisma.UniChoiceUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUniChoicesNestedInputSchema).optional()
}).strict();

export const UniChoiceUncheckedUpdateInputSchema: z.ZodType<Prisma.UniChoiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UniChoiceCreateManyInputSchema: z.ZodType<Prisma.UniChoiceCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  programId: z.string(),
  order: z.number().int()
}).strict();

export const UniChoiceUpdateManyMutationInputSchema: z.ZodType<Prisma.UniChoiceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UniChoiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UniChoiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailVerificationCreateInputSchema: z.ZodType<Prisma.EmailVerificationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  otp: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const EmailVerificationUncheckedCreateInputSchema: z.ZodType<Prisma.EmailVerificationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  otp: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const EmailVerificationUpdateInputSchema: z.ZodType<Prisma.EmailVerificationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailVerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.EmailVerificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailVerificationCreateManyInputSchema: z.ZodType<Prisma.EmailVerificationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  otp: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const EmailVerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.EmailVerificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailVerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmailVerificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RoomNullableScalarRelationFilterSchema: z.ZodType<Prisma.RoomNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => RoomWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RoomWhereInputSchema).optional().nullable()
}).strict();

export const TGATScoreNullableScalarRelationFilterSchema: z.ZodType<Prisma.TGATScoreNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => TGATScoreWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TGATScoreWhereInputSchema).optional().nullable()
}).strict();

export const TPATScoreNullableScalarRelationFilterSchema: z.ZodType<Prisma.TPATScoreNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => TPATScoreWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TPATScoreWhereInputSchema).optional().nullable()
}).strict();

export const ALevelScoreNullableScalarRelationFilterSchema: z.ZodType<Prisma.ALevelScoreNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ALevelScoreWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ALevelScoreWhereInputSchema).optional().nullable()
}).strict();

export const UniChoiceListRelationFilterSchema: z.ZodType<Prisma.UniChoiceListRelationFilter> = z.object({
  every: z.lazy(() => UniChoiceWhereInputSchema).optional(),
  some: z.lazy(() => UniChoiceWhereInputSchema).optional(),
  none: z.lazy(() => UniChoiceWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UniChoiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UniChoiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolYear: z.lazy(() => SortOrderSchema).optional(),
  seatNumber: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  homeroomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  seatNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolYear: z.lazy(() => SortOrderSchema).optional(),
  seatNumber: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  homeroomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolYear: z.lazy(() => SortOrderSchema).optional(),
  seatNumber: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  homeroomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  seatNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomGradeRoomNoCompoundUniqueInputSchema: z.ZodType<Prisma.RoomGradeRoomNoCompoundUniqueInput> = z.object({
  grade: z.number(),
  roomNo: z.number()
}).strict();

export const RoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoomCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoomAvgOrderByAggregateInput> = z.object({
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoomSumOrderByAggregateInput> = z.object({
  grade: z.lazy(() => SortOrderSchema).optional(),
  roomNo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TGATScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.TGATScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tgat1: z.lazy(() => SortOrderSchema).optional(),
  tgat2: z.lazy(() => SortOrderSchema).optional(),
  tgat3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TGATScoreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TGATScoreAvgOrderByAggregateInput> = z.object({
  tgat1: z.lazy(() => SortOrderSchema).optional(),
  tgat2: z.lazy(() => SortOrderSchema).optional(),
  tgat3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TGATScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TGATScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tgat1: z.lazy(() => SortOrderSchema).optional(),
  tgat2: z.lazy(() => SortOrderSchema).optional(),
  tgat3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TGATScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.TGATScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tgat1: z.lazy(() => SortOrderSchema).optional(),
  tgat2: z.lazy(() => SortOrderSchema).optional(),
  tgat3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TGATScoreSumOrderByAggregateInputSchema: z.ZodType<Prisma.TGATScoreSumOrderByAggregateInput> = z.object({
  tgat1: z.lazy(() => SortOrderSchema).optional(),
  tgat2: z.lazy(() => SortOrderSchema).optional(),
  tgat3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TPATScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.TPATScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tpat1: z.lazy(() => SortOrderSchema).optional(),
  tpat2: z.lazy(() => SortOrderSchema).optional(),
  tpat3: z.lazy(() => SortOrderSchema).optional(),
  tpat4: z.lazy(() => SortOrderSchema).optional(),
  tpat5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TPATScoreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TPATScoreAvgOrderByAggregateInput> = z.object({
  tpat1: z.lazy(() => SortOrderSchema).optional(),
  tpat2: z.lazy(() => SortOrderSchema).optional(),
  tpat3: z.lazy(() => SortOrderSchema).optional(),
  tpat4: z.lazy(() => SortOrderSchema).optional(),
  tpat5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TPATScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TPATScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tpat1: z.lazy(() => SortOrderSchema).optional(),
  tpat2: z.lazy(() => SortOrderSchema).optional(),
  tpat3: z.lazy(() => SortOrderSchema).optional(),
  tpat4: z.lazy(() => SortOrderSchema).optional(),
  tpat5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TPATScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.TPATScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tpat1: z.lazy(() => SortOrderSchema).optional(),
  tpat2: z.lazy(() => SortOrderSchema).optional(),
  tpat3: z.lazy(() => SortOrderSchema).optional(),
  tpat4: z.lazy(() => SortOrderSchema).optional(),
  tpat5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TPATScoreSumOrderByAggregateInputSchema: z.ZodType<Prisma.TPATScoreSumOrderByAggregateInput> = z.object({
  tpat1: z.lazy(() => SortOrderSchema).optional(),
  tpat2: z.lazy(() => SortOrderSchema).optional(),
  tpat3: z.lazy(() => SortOrderSchema).optional(),
  tpat4: z.lazy(() => SortOrderSchema).optional(),
  tpat5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ALevelScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.ALevelScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  alevel61: z.lazy(() => SortOrderSchema).optional(),
  alevel62: z.lazy(() => SortOrderSchema).optional(),
  alevel63: z.lazy(() => SortOrderSchema).optional(),
  alevel64: z.lazy(() => SortOrderSchema).optional(),
  alevel65: z.lazy(() => SortOrderSchema).optional(),
  alevel66: z.lazy(() => SortOrderSchema).optional(),
  alevel70: z.lazy(() => SortOrderSchema).optional(),
  alevel81: z.lazy(() => SortOrderSchema).optional(),
  alevel82: z.lazy(() => SortOrderSchema).optional(),
  alevel83: z.lazy(() => SortOrderSchema).optional(),
  alevel84: z.lazy(() => SortOrderSchema).optional(),
  alevel85: z.lazy(() => SortOrderSchema).optional(),
  alevel86: z.lazy(() => SortOrderSchema).optional(),
  alevel87: z.lazy(() => SortOrderSchema).optional(),
  alevel88: z.lazy(() => SortOrderSchema).optional(),
  alevel89: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ALevelScoreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ALevelScoreAvgOrderByAggregateInput> = z.object({
  alevel61: z.lazy(() => SortOrderSchema).optional(),
  alevel62: z.lazy(() => SortOrderSchema).optional(),
  alevel63: z.lazy(() => SortOrderSchema).optional(),
  alevel64: z.lazy(() => SortOrderSchema).optional(),
  alevel65: z.lazy(() => SortOrderSchema).optional(),
  alevel66: z.lazy(() => SortOrderSchema).optional(),
  alevel70: z.lazy(() => SortOrderSchema).optional(),
  alevel81: z.lazy(() => SortOrderSchema).optional(),
  alevel82: z.lazy(() => SortOrderSchema).optional(),
  alevel83: z.lazy(() => SortOrderSchema).optional(),
  alevel84: z.lazy(() => SortOrderSchema).optional(),
  alevel85: z.lazy(() => SortOrderSchema).optional(),
  alevel86: z.lazy(() => SortOrderSchema).optional(),
  alevel87: z.lazy(() => SortOrderSchema).optional(),
  alevel88: z.lazy(() => SortOrderSchema).optional(),
  alevel89: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ALevelScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ALevelScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  alevel61: z.lazy(() => SortOrderSchema).optional(),
  alevel62: z.lazy(() => SortOrderSchema).optional(),
  alevel63: z.lazy(() => SortOrderSchema).optional(),
  alevel64: z.lazy(() => SortOrderSchema).optional(),
  alevel65: z.lazy(() => SortOrderSchema).optional(),
  alevel66: z.lazy(() => SortOrderSchema).optional(),
  alevel70: z.lazy(() => SortOrderSchema).optional(),
  alevel81: z.lazy(() => SortOrderSchema).optional(),
  alevel82: z.lazy(() => SortOrderSchema).optional(),
  alevel83: z.lazy(() => SortOrderSchema).optional(),
  alevel84: z.lazy(() => SortOrderSchema).optional(),
  alevel85: z.lazy(() => SortOrderSchema).optional(),
  alevel86: z.lazy(() => SortOrderSchema).optional(),
  alevel87: z.lazy(() => SortOrderSchema).optional(),
  alevel88: z.lazy(() => SortOrderSchema).optional(),
  alevel89: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ALevelScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.ALevelScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  alevel61: z.lazy(() => SortOrderSchema).optional(),
  alevel62: z.lazy(() => SortOrderSchema).optional(),
  alevel63: z.lazy(() => SortOrderSchema).optional(),
  alevel64: z.lazy(() => SortOrderSchema).optional(),
  alevel65: z.lazy(() => SortOrderSchema).optional(),
  alevel66: z.lazy(() => SortOrderSchema).optional(),
  alevel70: z.lazy(() => SortOrderSchema).optional(),
  alevel81: z.lazy(() => SortOrderSchema).optional(),
  alevel82: z.lazy(() => SortOrderSchema).optional(),
  alevel83: z.lazy(() => SortOrderSchema).optional(),
  alevel84: z.lazy(() => SortOrderSchema).optional(),
  alevel85: z.lazy(() => SortOrderSchema).optional(),
  alevel86: z.lazy(() => SortOrderSchema).optional(),
  alevel87: z.lazy(() => SortOrderSchema).optional(),
  alevel88: z.lazy(() => SortOrderSchema).optional(),
  alevel89: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ALevelScoreSumOrderByAggregateInputSchema: z.ZodType<Prisma.ALevelScoreSumOrderByAggregateInput> = z.object({
  alevel61: z.lazy(() => SortOrderSchema).optional(),
  alevel62: z.lazy(() => SortOrderSchema).optional(),
  alevel63: z.lazy(() => SortOrderSchema).optional(),
  alevel64: z.lazy(() => SortOrderSchema).optional(),
  alevel65: z.lazy(() => SortOrderSchema).optional(),
  alevel66: z.lazy(() => SortOrderSchema).optional(),
  alevel70: z.lazy(() => SortOrderSchema).optional(),
  alevel81: z.lazy(() => SortOrderSchema).optional(),
  alevel82: z.lazy(() => SortOrderSchema).optional(),
  alevel83: z.lazy(() => SortOrderSchema).optional(),
  alevel84: z.lazy(() => SortOrderSchema).optional(),
  alevel85: z.lazy(() => SortOrderSchema).optional(),
  alevel86: z.lazy(() => SortOrderSchema).optional(),
  alevel87: z.lazy(() => SortOrderSchema).optional(),
  alevel88: z.lazy(() => SortOrderSchema).optional(),
  alevel89: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UniChoiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.UniChoiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UniChoiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UniChoiceAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UniChoiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UniChoiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UniChoiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.UniChoiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UniChoiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.UniChoiceSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailVerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailVerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailVerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailVerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailVerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmailVerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional()
}).strict();

export const RoomCreateNestedOneWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutHomeroomTeacherInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedCreateWithoutHomeroomTeacherInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutHomeroomTeacherInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional()
}).strict();

export const TGATScoreCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TGATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => TGATScoreWhereUniqueInputSchema).optional()
}).strict();

export const TPATScoreCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TPATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => TPATScoreWhereUniqueInputSchema).optional()
}).strict();

export const ALevelScoreCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ALevelScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ALevelScoreWhereUniqueInputSchema).optional()
}).strict();

export const UniChoiceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceCreateWithoutUserInputSchema).array(),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema),z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UniChoiceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TGATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => TGATScoreWhereUniqueInputSchema).optional()
}).strict();

export const TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TPATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => TPATScoreWhereUniqueInputSchema).optional()
}).strict();

export const ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ALevelScoreCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ALevelScoreWhereUniqueInputSchema).optional()
}).strict();

export const UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceCreateWithoutUserInputSchema).array(),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema),z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UniChoiceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RoomUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => RoomUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoomUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneWithoutHomeroomTeacherNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedCreateWithoutHomeroomTeacherInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutHomeroomTeacherInputSchema).optional(),
  upsert: z.lazy(() => RoomUpsertWithoutHomeroomTeacherInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoomUpdateToOneWithWhereWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUpdateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutHomeroomTeacherInputSchema) ]).optional(),
}).strict();

export const TGATScoreUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.TGATScoreUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TGATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => TGATScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TGATScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TGATScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TGATScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TGATScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => TGATScoreUpdateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const TPATScoreUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.TPATScoreUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TPATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => TPATScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TPATScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TPATScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TPATScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TPATScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => TPATScoreUpdateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ALevelScoreUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ALevelScoreUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ALevelScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ALevelScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ALevelScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ALevelScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ALevelScoreUpdateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UniChoiceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UniChoiceUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceCreateWithoutUserInputSchema).array(),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema),z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UniChoiceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UniChoiceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UniChoiceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UniChoiceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UniChoiceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UniChoiceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UniChoiceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UniChoiceScalarWhereInputSchema),z.lazy(() => UniChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.TGATScoreUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TGATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => TGATScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TGATScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TGATScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TGATScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TGATScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => TGATScoreUpdateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.TPATScoreUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TPATScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => TPATScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TPATScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TPATScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TPATScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TPATScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => TPATScoreUpdateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ALevelScoreCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ALevelScoreUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ALevelScoreWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ALevelScoreWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ALevelScoreUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ALevelScoreUpdateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UniChoiceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceCreateWithoutUserInputSchema).array(),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema),z.lazy(() => UniChoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UniChoiceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UniChoiceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UniChoiceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UniChoiceWhereUniqueInputSchema),z.lazy(() => UniChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UniChoiceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UniChoiceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UniChoiceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UniChoiceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UniChoiceScalarWhereInputSchema),z.lazy(() => UniChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutHomeroomInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHomeroomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHomeroomInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedOneWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedOneWithoutHomeroomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHomeroomInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutHomeroomNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutHomeroomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHomeroomInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHomeroomInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHomeroomInputSchema),z.lazy(() => UserUpdateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHomeroomInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateOneWithoutHomeroomNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateOneWithoutHomeroomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHomeroomInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHomeroomInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHomeroomInputSchema),z.lazy(() => UserUpdateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHomeroomInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTgatScoreInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTgatScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTgatScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTgatScoreNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTgatScoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTgatScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTgatScoreInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTgatScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTgatScoreInputSchema),z.lazy(() => UserUpdateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTgatScoreInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTpatScoreInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTpatScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTpatScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTpatScoreNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTpatScoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTpatScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTpatScoreInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTpatScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTpatScoreInputSchema),z.lazy(() => UserUpdateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTpatScoreInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAlevelScoreInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlevelScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlevelScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAlevelScoreNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAlevelScoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlevelScoreInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlevelScoreInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAlevelScoreInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAlevelScoreInputSchema),z.lazy(() => UserUpdateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlevelScoreInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUniChoicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUniChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUniChoicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUniChoicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUniChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUniChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUniChoicesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUniChoicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUniChoicesInputSchema),z.lazy(() => UserUpdateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUniChoicesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const RoomCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  homeroomTeacher: z.lazy(() => UserCreateNestedOneWithoutHomeroomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  homeroomTeacher: z.lazy(() => UserUncheckedCreateNestedOneWithoutHomeroomInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RoomCreateWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomCreateWithoutHomeroomTeacherInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutHomeroomTeacherInput> = z.object({
  id: z.string().uuid().optional(),
  label: z.string(),
  grade: z.number().int(),
  roomNo: z.number().int(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutHomeroomTeacherInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedCreateWithoutHomeroomTeacherInputSchema) ]),
}).strict();

export const TGATScoreCreateWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  tgat1: z.number().int().optional().nullable(),
  tgat2: z.number().int().optional().nullable(),
  tgat3: z.number().int().optional().nullable()
}).strict();

export const TGATScoreUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  tgat1: z.number().int().optional().nullable(),
  tgat2: z.number().int().optional().nullable(),
  tgat3: z.number().int().optional().nullable()
}).strict();

export const TGATScoreCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TGATScoreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TPATScoreCreateWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  tpat1: z.number().int().optional().nullable(),
  tpat2: z.number().int().optional().nullable(),
  tpat3: z.number().int().optional().nullable(),
  tpat4: z.number().int().optional().nullable(),
  tpat5: z.number().int().optional().nullable()
}).strict();

export const TPATScoreUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  tpat1: z.number().int().optional().nullable(),
  tpat2: z.number().int().optional().nullable(),
  tpat3: z.number().int().optional().nullable(),
  tpat4: z.number().int().optional().nullable(),
  tpat5: z.number().int().optional().nullable()
}).strict();

export const TPATScoreCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TPATScoreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ALevelScoreCreateWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  alevel61: z.number().int().optional().nullable(),
  alevel62: z.number().int().optional().nullable(),
  alevel63: z.number().int().optional().nullable(),
  alevel64: z.number().int().optional().nullable(),
  alevel65: z.number().int().optional().nullable(),
  alevel66: z.number().int().optional().nullable(),
  alevel70: z.number().int().optional().nullable(),
  alevel81: z.number().int().optional().nullable(),
  alevel82: z.number().int().optional().nullable(),
  alevel83: z.number().int().optional().nullable(),
  alevel84: z.number().int().optional().nullable(),
  alevel85: z.number().int().optional().nullable(),
  alevel86: z.number().int().optional().nullable(),
  alevel87: z.number().int().optional().nullable(),
  alevel88: z.number().int().optional().nullable(),
  alevel89: z.number().int().optional().nullable()
}).strict();

export const ALevelScoreUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  alevel61: z.number().int().optional().nullable(),
  alevel62: z.number().int().optional().nullable(),
  alevel63: z.number().int().optional().nullable(),
  alevel64: z.number().int().optional().nullable(),
  alevel65: z.number().int().optional().nullable(),
  alevel66: z.number().int().optional().nullable(),
  alevel70: z.number().int().optional().nullable(),
  alevel81: z.number().int().optional().nullable(),
  alevel82: z.number().int().optional().nullable(),
  alevel83: z.number().int().optional().nullable(),
  alevel84: z.number().int().optional().nullable(),
  alevel85: z.number().int().optional().nullable(),
  alevel86: z.number().int().optional().nullable(),
  alevel87: z.number().int().optional().nullable(),
  alevel88: z.number().int().optional().nullable(),
  alevel89: z.number().int().optional().nullable()
}).strict();

export const ALevelScoreCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ALevelScoreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UniChoiceCreateWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  programId: z.string(),
  order: z.number().int()
}).strict();

export const UniChoiceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  programId: z.string(),
  order: z.number().int()
}).strict();

export const UniChoiceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UniChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UniChoiceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UniChoiceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UniChoiceCreateManyUserInputSchema),z.lazy(() => UniChoiceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RoomUpsertWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const RoomUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RoomUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  homeroomTeacher: z.lazy(() => UserUpdateOneWithoutHomeroomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  homeroomTeacher: z.lazy(() => UserUncheckedUpdateOneWithoutHomeroomNestedInputSchema).optional()
}).strict();

export const RoomUpsertWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomUpsertWithoutHomeroomTeacherInput> = z.object({
  update: z.union([ z.lazy(() => RoomUpdateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutHomeroomTeacherInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedCreateWithoutHomeroomTeacherInputSchema) ]),
  where: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const RoomUpdateToOneWithWhereWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutHomeroomTeacherInput> = z.object({
  where: z.lazy(() => RoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoomUpdateWithoutHomeroomTeacherInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutHomeroomTeacherInputSchema) ]),
}).strict();

export const RoomUpdateWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomUpdateWithoutHomeroomTeacherInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutHomeroomTeacherInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutHomeroomTeacherInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grade: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const TGATScoreUpsertWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => TGATScoreUpdateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TGATScoreCreateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => TGATScoreWhereInputSchema).optional()
}).strict();

export const TGATScoreUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TGATScoreWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TGATScoreUpdateWithoutUserInputSchema),z.lazy(() => TGATScoreUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TGATScoreUpdateWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TGATScoreUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TGATScoreUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tgat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TPATScoreUpsertWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => TPATScoreUpdateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TPATScoreCreateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => TPATScoreWhereInputSchema).optional()
}).strict();

export const TPATScoreUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TPATScoreWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TPATScoreUpdateWithoutUserInputSchema),z.lazy(() => TPATScoreUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TPATScoreUpdateWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TPATScoreUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TPATScoreUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tpat1: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat2: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat3: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat4: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpat5: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ALevelScoreUpsertWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ALevelScoreUpdateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ALevelScoreCreateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ALevelScoreWhereInputSchema).optional()
}).strict();

export const ALevelScoreUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ALevelScoreWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ALevelScoreUpdateWithoutUserInputSchema),z.lazy(() => ALevelScoreUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ALevelScoreUpdateWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ALevelScoreUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ALevelScoreUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alevel61: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel62: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel63: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel64: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel65: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel66: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel70: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel81: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel82: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel83: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel84: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel85: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel86: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel87: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel88: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alevel89: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UniChoiceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UniChoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UniChoiceUpdateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UniChoiceCreateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UniChoiceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UniChoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UniChoiceUpdateWithoutUserInputSchema),z.lazy(() => UniChoiceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UniChoiceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UniChoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UniChoiceUpdateManyMutationInputSchema),z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UniChoiceScalarWhereInputSchema: z.ZodType<Prisma.UniChoiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UniChoiceScalarWhereInputSchema),z.lazy(() => UniChoiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UniChoiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UniChoiceScalarWhereInputSchema),z.lazy(() => UniChoiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateWithoutRoomInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoomInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const UserCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyRoomInputSchema),z.lazy(() => UserCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutHomeroomInputSchema: z.ZodType<Prisma.UserCreateWithoutHomeroomInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHomeroomInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHomeroomInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHomeroomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  schoolYear: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seatNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  homeroomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUpsertWithoutHomeroomInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHomeroomInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedCreateWithoutHomeroomInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHomeroomInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHomeroomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHomeroomInputSchema) ]),
}).strict();

export const UserUpdateWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUpdateWithoutHomeroomInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHomeroomInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHomeroomInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserCreateWithoutTgatScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTgatScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTgatScoreInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTgatScoreInputSchema) ]),
}).strict();

export const UserUpsertWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserUpsertWithoutTgatScoreInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTgatScoreInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTgatScoreInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTgatScoreInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTgatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTgatScoreInputSchema) ]),
}).strict();

export const UserUpdateWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserUpdateWithoutTgatScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTgatScoreInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTgatScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserCreateWithoutTpatScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTpatScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTpatScoreInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTpatScoreInputSchema) ]),
}).strict();

export const UserUpsertWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserUpsertWithoutTpatScoreInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTpatScoreInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutTpatScoreInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTpatScoreInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTpatScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTpatScoreInputSchema) ]),
}).strict();

export const UserUpdateWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserUpdateWithoutTpatScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTpatScoreInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTpatScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserCreateWithoutAlevelScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAlevelScoreInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAlevelScoreInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlevelScoreInputSchema) ]),
}).strict();

export const UserUpsertWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserUpsertWithoutAlevelScoreInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlevelScoreInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlevelScoreInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAlevelScoreInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAlevelScoreInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlevelScoreInputSchema) ]),
}).strict();

export const UserUpdateWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserUpdateWithoutAlevelScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAlevelScoreInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAlevelScoreInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserCreateWithoutUniChoicesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutUsersInputSchema).optional(),
  homeroom: z.lazy(() => RoomCreateNestedOneWithoutHomeroomTeacherInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUniChoicesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  roomId: z.string().optional().nullable(),
  homeroomId: z.string().optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUniChoicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUniChoicesInputSchema) ]),
}).strict();

export const UserUpsertWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUniChoicesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUniChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUniChoicesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUniChoicesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUniChoicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUniChoicesInputSchema) ]),
}).strict();

export const UserUpdateWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutUniChoicesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneWithoutUsersNestedInputSchema).optional(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUniChoicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUniChoicesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UniChoiceCreateManyUserInputSchema: z.ZodType<Prisma.UniChoiceCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  programId: z.string(),
  order: z.number().int()
}).strict();

export const UniChoiceUpdateWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UniChoiceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UniChoiceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UniChoiceUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyRoomInputSchema: z.ZodType<Prisma.UserCreateManyRoomInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  password: z.string(),
  updatedAt: z.coerce.date().optional(),
  role: z.string(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  schoolYear: z.string().optional().nullable(),
  seatNumber: z.number().int().optional().nullable(),
  homeroomId: z.string().optional().nullable()
}).strict();

export const UserUpdateWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroom: z.lazy(() => RoomUpdateOneWithoutHomeroomTeacherNestedInputSchema).optional(),
  tgatScore: z.lazy(() => TGATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tgatScore: z.lazy(() => TGATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  tpatScore: z.lazy(() => TPATScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  alevelScore: z.lazy(() => ALevelScoreUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  uniChoices: z.lazy(() => UniChoiceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolYear: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  homeroomId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const RoomFindFirstArgsSchema: z.ZodType<Prisma.RoomFindFirstArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoomFindFirstOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindManyArgsSchema: z.ZodType<Prisma.RoomFindManyArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomAggregateArgsSchema: z.ZodType<Prisma.RoomAggregateArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomGroupByArgsSchema: z.ZodType<Prisma.RoomGroupByArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithAggregationInputSchema.array(),RoomOrderByWithAggregationInputSchema ]).optional(),
  by: RoomScalarFieldEnumSchema.array(),
  having: RoomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomFindUniqueArgsSchema: z.ZodType<Prisma.RoomFindUniqueArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoomFindUniqueOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const TGATScoreFindFirstArgsSchema: z.ZodType<Prisma.TGATScoreFindFirstArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TGATScoreOrderByWithRelationInputSchema.array(),TGATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TGATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TGATScoreScalarFieldEnumSchema,TGATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TGATScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TGATScoreFindFirstOrThrowArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TGATScoreOrderByWithRelationInputSchema.array(),TGATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TGATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TGATScoreScalarFieldEnumSchema,TGATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TGATScoreFindManyArgsSchema: z.ZodType<Prisma.TGATScoreFindManyArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TGATScoreOrderByWithRelationInputSchema.array(),TGATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TGATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TGATScoreScalarFieldEnumSchema,TGATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TGATScoreAggregateArgsSchema: z.ZodType<Prisma.TGATScoreAggregateArgs> = z.object({
  where: TGATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TGATScoreOrderByWithRelationInputSchema.array(),TGATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TGATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TGATScoreGroupByArgsSchema: z.ZodType<Prisma.TGATScoreGroupByArgs> = z.object({
  where: TGATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TGATScoreOrderByWithAggregationInputSchema.array(),TGATScoreOrderByWithAggregationInputSchema ]).optional(),
  by: TGATScoreScalarFieldEnumSchema.array(),
  having: TGATScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TGATScoreFindUniqueArgsSchema: z.ZodType<Prisma.TGATScoreFindUniqueArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereUniqueInputSchema,
}).strict() ;

export const TGATScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TGATScoreFindUniqueOrThrowArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereUniqueInputSchema,
}).strict() ;

export const TPATScoreFindFirstArgsSchema: z.ZodType<Prisma.TPATScoreFindFirstArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TPATScoreOrderByWithRelationInputSchema.array(),TPATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TPATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TPATScoreScalarFieldEnumSchema,TPATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TPATScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TPATScoreFindFirstOrThrowArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TPATScoreOrderByWithRelationInputSchema.array(),TPATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TPATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TPATScoreScalarFieldEnumSchema,TPATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TPATScoreFindManyArgsSchema: z.ZodType<Prisma.TPATScoreFindManyArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TPATScoreOrderByWithRelationInputSchema.array(),TPATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TPATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TPATScoreScalarFieldEnumSchema,TPATScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TPATScoreAggregateArgsSchema: z.ZodType<Prisma.TPATScoreAggregateArgs> = z.object({
  where: TPATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TPATScoreOrderByWithRelationInputSchema.array(),TPATScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: TPATScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TPATScoreGroupByArgsSchema: z.ZodType<Prisma.TPATScoreGroupByArgs> = z.object({
  where: TPATScoreWhereInputSchema.optional(),
  orderBy: z.union([ TPATScoreOrderByWithAggregationInputSchema.array(),TPATScoreOrderByWithAggregationInputSchema ]).optional(),
  by: TPATScoreScalarFieldEnumSchema.array(),
  having: TPATScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TPATScoreFindUniqueArgsSchema: z.ZodType<Prisma.TPATScoreFindUniqueArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereUniqueInputSchema,
}).strict() ;

export const TPATScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TPATScoreFindUniqueOrThrowArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereUniqueInputSchema,
}).strict() ;

export const ALevelScoreFindFirstArgsSchema: z.ZodType<Prisma.ALevelScoreFindFirstArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereInputSchema.optional(),
  orderBy: z.union([ ALevelScoreOrderByWithRelationInputSchema.array(),ALevelScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ALevelScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ALevelScoreScalarFieldEnumSchema,ALevelScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ALevelScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ALevelScoreFindFirstOrThrowArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereInputSchema.optional(),
  orderBy: z.union([ ALevelScoreOrderByWithRelationInputSchema.array(),ALevelScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ALevelScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ALevelScoreScalarFieldEnumSchema,ALevelScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ALevelScoreFindManyArgsSchema: z.ZodType<Prisma.ALevelScoreFindManyArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereInputSchema.optional(),
  orderBy: z.union([ ALevelScoreOrderByWithRelationInputSchema.array(),ALevelScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ALevelScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ALevelScoreScalarFieldEnumSchema,ALevelScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ALevelScoreAggregateArgsSchema: z.ZodType<Prisma.ALevelScoreAggregateArgs> = z.object({
  where: ALevelScoreWhereInputSchema.optional(),
  orderBy: z.union([ ALevelScoreOrderByWithRelationInputSchema.array(),ALevelScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ALevelScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ALevelScoreGroupByArgsSchema: z.ZodType<Prisma.ALevelScoreGroupByArgs> = z.object({
  where: ALevelScoreWhereInputSchema.optional(),
  orderBy: z.union([ ALevelScoreOrderByWithAggregationInputSchema.array(),ALevelScoreOrderByWithAggregationInputSchema ]).optional(),
  by: ALevelScoreScalarFieldEnumSchema.array(),
  having: ALevelScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ALevelScoreFindUniqueArgsSchema: z.ZodType<Prisma.ALevelScoreFindUniqueArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereUniqueInputSchema,
}).strict() ;

export const ALevelScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ALevelScoreFindUniqueOrThrowArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereUniqueInputSchema,
}).strict() ;

export const UniChoiceFindFirstArgsSchema: z.ZodType<Prisma.UniChoiceFindFirstArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereInputSchema.optional(),
  orderBy: z.union([ UniChoiceOrderByWithRelationInputSchema.array(),UniChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: UniChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UniChoiceScalarFieldEnumSchema,UniChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UniChoiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UniChoiceFindFirstOrThrowArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereInputSchema.optional(),
  orderBy: z.union([ UniChoiceOrderByWithRelationInputSchema.array(),UniChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: UniChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UniChoiceScalarFieldEnumSchema,UniChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UniChoiceFindManyArgsSchema: z.ZodType<Prisma.UniChoiceFindManyArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereInputSchema.optional(),
  orderBy: z.union([ UniChoiceOrderByWithRelationInputSchema.array(),UniChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: UniChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UniChoiceScalarFieldEnumSchema,UniChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UniChoiceAggregateArgsSchema: z.ZodType<Prisma.UniChoiceAggregateArgs> = z.object({
  where: UniChoiceWhereInputSchema.optional(),
  orderBy: z.union([ UniChoiceOrderByWithRelationInputSchema.array(),UniChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: UniChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UniChoiceGroupByArgsSchema: z.ZodType<Prisma.UniChoiceGroupByArgs> = z.object({
  where: UniChoiceWhereInputSchema.optional(),
  orderBy: z.union([ UniChoiceOrderByWithAggregationInputSchema.array(),UniChoiceOrderByWithAggregationInputSchema ]).optional(),
  by: UniChoiceScalarFieldEnumSchema.array(),
  having: UniChoiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UniChoiceFindUniqueArgsSchema: z.ZodType<Prisma.UniChoiceFindUniqueArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereUniqueInputSchema,
}).strict() ;

export const UniChoiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UniChoiceFindUniqueOrThrowArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereUniqueInputSchema,
}).strict() ;

export const EmailVerificationFindFirstArgsSchema: z.ZodType<Prisma.EmailVerificationFindFirstArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereInputSchema.optional(),
  orderBy: z.union([ EmailVerificationOrderByWithRelationInputSchema.array(),EmailVerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailVerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailVerificationScalarFieldEnumSchema,EmailVerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailVerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailVerificationFindFirstOrThrowArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereInputSchema.optional(),
  orderBy: z.union([ EmailVerificationOrderByWithRelationInputSchema.array(),EmailVerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailVerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailVerificationScalarFieldEnumSchema,EmailVerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailVerificationFindManyArgsSchema: z.ZodType<Prisma.EmailVerificationFindManyArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereInputSchema.optional(),
  orderBy: z.union([ EmailVerificationOrderByWithRelationInputSchema.array(),EmailVerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailVerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailVerificationScalarFieldEnumSchema,EmailVerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailVerificationAggregateArgsSchema: z.ZodType<Prisma.EmailVerificationAggregateArgs> = z.object({
  where: EmailVerificationWhereInputSchema.optional(),
  orderBy: z.union([ EmailVerificationOrderByWithRelationInputSchema.array(),EmailVerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailVerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailVerificationGroupByArgsSchema: z.ZodType<Prisma.EmailVerificationGroupByArgs> = z.object({
  where: EmailVerificationWhereInputSchema.optional(),
  orderBy: z.union([ EmailVerificationOrderByWithAggregationInputSchema.array(),EmailVerificationOrderByWithAggregationInputSchema ]).optional(),
  by: EmailVerificationScalarFieldEnumSchema.array(),
  having: EmailVerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailVerificationFindUniqueArgsSchema: z.ZodType<Prisma.EmailVerificationFindUniqueArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereUniqueInputSchema,
}).strict() ;

export const EmailVerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmailVerificationFindUniqueOrThrowArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoomCreateArgsSchema: z.ZodType<Prisma.RoomCreateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]),
}).strict() ;

export const RoomUpsertArgsSchema: z.ZodType<Prisma.RoomUpsertArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
  create: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]),
  update: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoomCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoomCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoomDeleteArgsSchema: z.ZodType<Prisma.RoomDeleteArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateArgsSchema: z.ZodType<Prisma.RoomUpdateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z.object({
  data: z.union([ RoomUpdateManyMutationInputSchema,RoomUncheckedUpdateManyInputSchema ]),
  where: RoomWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoomUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RoomUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RoomUpdateManyMutationInputSchema,RoomUncheckedUpdateManyInputSchema ]),
  where: RoomWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TGATScoreCreateArgsSchema: z.ZodType<Prisma.TGATScoreCreateArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  data: z.union([ TGATScoreCreateInputSchema,TGATScoreUncheckedCreateInputSchema ]),
}).strict() ;

export const TGATScoreUpsertArgsSchema: z.ZodType<Prisma.TGATScoreUpsertArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereUniqueInputSchema,
  create: z.union([ TGATScoreCreateInputSchema,TGATScoreUncheckedCreateInputSchema ]),
  update: z.union([ TGATScoreUpdateInputSchema,TGATScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const TGATScoreCreateManyArgsSchema: z.ZodType<Prisma.TGATScoreCreateManyArgs> = z.object({
  data: z.union([ TGATScoreCreateManyInputSchema,TGATScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TGATScoreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TGATScoreCreateManyAndReturnArgs> = z.object({
  data: z.union([ TGATScoreCreateManyInputSchema,TGATScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TGATScoreDeleteArgsSchema: z.ZodType<Prisma.TGATScoreDeleteArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  where: TGATScoreWhereUniqueInputSchema,
}).strict() ;

export const TGATScoreUpdateArgsSchema: z.ZodType<Prisma.TGATScoreUpdateArgs> = z.object({
  select: TGATScoreSelectSchema.optional(),
  include: TGATScoreIncludeSchema.optional(),
  data: z.union([ TGATScoreUpdateInputSchema,TGATScoreUncheckedUpdateInputSchema ]),
  where: TGATScoreWhereUniqueInputSchema,
}).strict() ;

export const TGATScoreUpdateManyArgsSchema: z.ZodType<Prisma.TGATScoreUpdateManyArgs> = z.object({
  data: z.union([ TGATScoreUpdateManyMutationInputSchema,TGATScoreUncheckedUpdateManyInputSchema ]),
  where: TGATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TGATScoreUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TGATScoreUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TGATScoreUpdateManyMutationInputSchema,TGATScoreUncheckedUpdateManyInputSchema ]),
  where: TGATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TGATScoreDeleteManyArgsSchema: z.ZodType<Prisma.TGATScoreDeleteManyArgs> = z.object({
  where: TGATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TPATScoreCreateArgsSchema: z.ZodType<Prisma.TPATScoreCreateArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  data: z.union([ TPATScoreCreateInputSchema,TPATScoreUncheckedCreateInputSchema ]),
}).strict() ;

export const TPATScoreUpsertArgsSchema: z.ZodType<Prisma.TPATScoreUpsertArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereUniqueInputSchema,
  create: z.union([ TPATScoreCreateInputSchema,TPATScoreUncheckedCreateInputSchema ]),
  update: z.union([ TPATScoreUpdateInputSchema,TPATScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const TPATScoreCreateManyArgsSchema: z.ZodType<Prisma.TPATScoreCreateManyArgs> = z.object({
  data: z.union([ TPATScoreCreateManyInputSchema,TPATScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TPATScoreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TPATScoreCreateManyAndReturnArgs> = z.object({
  data: z.union([ TPATScoreCreateManyInputSchema,TPATScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TPATScoreDeleteArgsSchema: z.ZodType<Prisma.TPATScoreDeleteArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  where: TPATScoreWhereUniqueInputSchema,
}).strict() ;

export const TPATScoreUpdateArgsSchema: z.ZodType<Prisma.TPATScoreUpdateArgs> = z.object({
  select: TPATScoreSelectSchema.optional(),
  include: TPATScoreIncludeSchema.optional(),
  data: z.union([ TPATScoreUpdateInputSchema,TPATScoreUncheckedUpdateInputSchema ]),
  where: TPATScoreWhereUniqueInputSchema,
}).strict() ;

export const TPATScoreUpdateManyArgsSchema: z.ZodType<Prisma.TPATScoreUpdateManyArgs> = z.object({
  data: z.union([ TPATScoreUpdateManyMutationInputSchema,TPATScoreUncheckedUpdateManyInputSchema ]),
  where: TPATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TPATScoreUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TPATScoreUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TPATScoreUpdateManyMutationInputSchema,TPATScoreUncheckedUpdateManyInputSchema ]),
  where: TPATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TPATScoreDeleteManyArgsSchema: z.ZodType<Prisma.TPATScoreDeleteManyArgs> = z.object({
  where: TPATScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ALevelScoreCreateArgsSchema: z.ZodType<Prisma.ALevelScoreCreateArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  data: z.union([ ALevelScoreCreateInputSchema,ALevelScoreUncheckedCreateInputSchema ]),
}).strict() ;

export const ALevelScoreUpsertArgsSchema: z.ZodType<Prisma.ALevelScoreUpsertArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereUniqueInputSchema,
  create: z.union([ ALevelScoreCreateInputSchema,ALevelScoreUncheckedCreateInputSchema ]),
  update: z.union([ ALevelScoreUpdateInputSchema,ALevelScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const ALevelScoreCreateManyArgsSchema: z.ZodType<Prisma.ALevelScoreCreateManyArgs> = z.object({
  data: z.union([ ALevelScoreCreateManyInputSchema,ALevelScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ALevelScoreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ALevelScoreCreateManyAndReturnArgs> = z.object({
  data: z.union([ ALevelScoreCreateManyInputSchema,ALevelScoreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ALevelScoreDeleteArgsSchema: z.ZodType<Prisma.ALevelScoreDeleteArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  where: ALevelScoreWhereUniqueInputSchema,
}).strict() ;

export const ALevelScoreUpdateArgsSchema: z.ZodType<Prisma.ALevelScoreUpdateArgs> = z.object({
  select: ALevelScoreSelectSchema.optional(),
  include: ALevelScoreIncludeSchema.optional(),
  data: z.union([ ALevelScoreUpdateInputSchema,ALevelScoreUncheckedUpdateInputSchema ]),
  where: ALevelScoreWhereUniqueInputSchema,
}).strict() ;

export const ALevelScoreUpdateManyArgsSchema: z.ZodType<Prisma.ALevelScoreUpdateManyArgs> = z.object({
  data: z.union([ ALevelScoreUpdateManyMutationInputSchema,ALevelScoreUncheckedUpdateManyInputSchema ]),
  where: ALevelScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ALevelScoreUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ALevelScoreUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ALevelScoreUpdateManyMutationInputSchema,ALevelScoreUncheckedUpdateManyInputSchema ]),
  where: ALevelScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ALevelScoreDeleteManyArgsSchema: z.ZodType<Prisma.ALevelScoreDeleteManyArgs> = z.object({
  where: ALevelScoreWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UniChoiceCreateArgsSchema: z.ZodType<Prisma.UniChoiceCreateArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  data: z.union([ UniChoiceCreateInputSchema,UniChoiceUncheckedCreateInputSchema ]),
}).strict() ;

export const UniChoiceUpsertArgsSchema: z.ZodType<Prisma.UniChoiceUpsertArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereUniqueInputSchema,
  create: z.union([ UniChoiceCreateInputSchema,UniChoiceUncheckedCreateInputSchema ]),
  update: z.union([ UniChoiceUpdateInputSchema,UniChoiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const UniChoiceCreateManyArgsSchema: z.ZodType<Prisma.UniChoiceCreateManyArgs> = z.object({
  data: z.union([ UniChoiceCreateManyInputSchema,UniChoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UniChoiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UniChoiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ UniChoiceCreateManyInputSchema,UniChoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UniChoiceDeleteArgsSchema: z.ZodType<Prisma.UniChoiceDeleteArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  where: UniChoiceWhereUniqueInputSchema,
}).strict() ;

export const UniChoiceUpdateArgsSchema: z.ZodType<Prisma.UniChoiceUpdateArgs> = z.object({
  select: UniChoiceSelectSchema.optional(),
  include: UniChoiceIncludeSchema.optional(),
  data: z.union([ UniChoiceUpdateInputSchema,UniChoiceUncheckedUpdateInputSchema ]),
  where: UniChoiceWhereUniqueInputSchema,
}).strict() ;

export const UniChoiceUpdateManyArgsSchema: z.ZodType<Prisma.UniChoiceUpdateManyArgs> = z.object({
  data: z.union([ UniChoiceUpdateManyMutationInputSchema,UniChoiceUncheckedUpdateManyInputSchema ]),
  where: UniChoiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UniChoiceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UniChoiceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UniChoiceUpdateManyMutationInputSchema,UniChoiceUncheckedUpdateManyInputSchema ]),
  where: UniChoiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UniChoiceDeleteManyArgsSchema: z.ZodType<Prisma.UniChoiceDeleteManyArgs> = z.object({
  where: UniChoiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmailVerificationCreateArgsSchema: z.ZodType<Prisma.EmailVerificationCreateArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  data: z.union([ EmailVerificationCreateInputSchema,EmailVerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const EmailVerificationUpsertArgsSchema: z.ZodType<Prisma.EmailVerificationUpsertArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereUniqueInputSchema,
  create: z.union([ EmailVerificationCreateInputSchema,EmailVerificationUncheckedCreateInputSchema ]),
  update: z.union([ EmailVerificationUpdateInputSchema,EmailVerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const EmailVerificationCreateManyArgsSchema: z.ZodType<Prisma.EmailVerificationCreateManyArgs> = z.object({
  data: z.union([ EmailVerificationCreateManyInputSchema,EmailVerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailVerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailVerificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailVerificationCreateManyInputSchema,EmailVerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailVerificationDeleteArgsSchema: z.ZodType<Prisma.EmailVerificationDeleteArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  where: EmailVerificationWhereUniqueInputSchema,
}).strict() ;

export const EmailVerificationUpdateArgsSchema: z.ZodType<Prisma.EmailVerificationUpdateArgs> = z.object({
  select: EmailVerificationSelectSchema.optional(),
  data: z.union([ EmailVerificationUpdateInputSchema,EmailVerificationUncheckedUpdateInputSchema ]),
  where: EmailVerificationWhereUniqueInputSchema,
}).strict() ;

export const EmailVerificationUpdateManyArgsSchema: z.ZodType<Prisma.EmailVerificationUpdateManyArgs> = z.object({
  data: z.union([ EmailVerificationUpdateManyMutationInputSchema,EmailVerificationUncheckedUpdateManyInputSchema ]),
  where: EmailVerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmailVerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailVerificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailVerificationUpdateManyMutationInputSchema,EmailVerificationUncheckedUpdateManyInputSchema ]),
  where: EmailVerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmailVerificationDeleteManyArgsSchema: z.ZodType<Prisma.EmailVerificationDeleteManyArgs> = z.object({
  where: EmailVerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;