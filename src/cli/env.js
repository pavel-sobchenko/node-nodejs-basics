import dotenv from "dotenv";
const result = dotenv.config();

const parseEnv = () => {
    try {
        const prefix = "RSS_";
        const allVariables = process.env;
        const filteredVariables = Object.keys(allVariables)
        .filter((key) => key.startsWith(prefix))
        .reduce((obj, key) => {
            obj[key] = allVariables[key];
            return obj;
        }, {});

        const formattedVariables = Object.entries(filteredVariables)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");

        console.log(`Environment variables with prefix "${prefix}":`);    
        console.log(formattedVariables);    

    }  catch (err) {
        console.log(err);
    }
};

parseEnv();