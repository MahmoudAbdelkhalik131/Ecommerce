declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: number;
        readonly DBLINK:string;
        readonly NODE_ENV:string;
    }
}