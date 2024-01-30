const parseArgs = () => {
    // Write your code here 
    const args = process.argv.slice(2);
    const parsedArguments = {};

    for (let i = 0; i < args.length; i += 2) {
        const propName = args[i].replace(/^--/, '');
        const propValue = args[i + 1];
        parsedArguments[propName] = propValue;
    }

    for (const [propName, propValue] of Object.entries(parsedArguments)) {
        console.log(`${propName} is ${propValue}`);
      }
};

parseArgs();