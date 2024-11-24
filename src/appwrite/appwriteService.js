import { Client, Account } from "appwrite";
import config from "../config/config";

class AppwriteService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

}

const appwriteService = new AppwriteService();
export default appwriteService;