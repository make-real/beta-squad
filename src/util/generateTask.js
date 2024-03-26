export default function parseTasks(taskString) {
    const tasks = [];
    const taskRegex = /<Title>(.*?)<\/Title>[\s\S]*?<Description>(.*?)<\/Description>[\s\S]*?<Checklist>(.*?)<\/Checklist>[\s\S]*?<Assignes>(.*?)<\/Assigne>[\s\S]*?<Time>(.*?)<\/Time>[\s\S]*?<Calendar>[\s\S]*?<Start “(.*?)” \/>[\s\S]*?<End “(.*?)” \/>/gs;
    let match;
  
    while ((match = taskRegex.exec(taskString)) !== null) {
      const task = {
        Title: match[1].trim(),
        Description: match[2].trim().split(":")[1].trim(),
        Checklist: match[3].trim().split('\n').map(item => item.trim().split('.')[1].trim()),
        Assignees: match[4].trim().split('\n').map(item => item.trim().split('“')[1].split('”')[0]),
        EstimatedTime: match[5].trim().split(':')[1].trim(),
        Calendar: {
          Start: match[6].trim(),
          End: match[7].trim()
        }
      };
  
      tasks.push(task);
    }
  
    return tasks;
}
