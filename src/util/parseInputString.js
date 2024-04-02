function parseInputString(inputString) {
    // Regular expressions to match desired patterns
    const titleRegex = /<Title>(.*?)<\/Title>/g;
    const descriptionRegex = /<Description>(.*?)<\/Description>/g;
    const subTaskRegex = /<SubTask>(.*?)<\/SubTask>/g;
    const assigneeRegex = /<Assigne>(.*?)<\/Assigne>/g;
    const timeRegex = /<Time>(.*?)<\/Time>/g;
    const startRegex = /<Start>(.*?)<\/Start>/g;
    const endRegex = /<End>(.*?)<\/End>/g;
  
    // Array to store parsed objects
    let result = [];
  
    // Match titles
    let titles = [...inputString.matchAll(titleRegex)];
  
    // Iterate through each title
    titles.forEach((titleMatch, index) => {
      let titleObj = {};
      titleObj.title = titleMatch[1].trim();
  
      // Match description
      let descriptionMatch = descriptionRegex.exec(inputString);
      if (descriptionMatch) {
        titleObj.description = descriptionMatch[1].trim();
      }
  
      // Match subtasks
      let subTasks = [];
      let subTaskMatch;
      while ((subTaskMatch = subTaskRegex.exec(inputString)) !== null) {
        subTasks.push(subTaskMatch[1].trim());
      }
      titleObj.checklist = { subTasks };
  
      // Match assignees
      let assignees = [];
      let assigneeMatch;
      while ((assigneeMatch = assigneeRegex.exec(inputString)) !== null) {
        assignees.push(assigneeMatch[1].trim());
      }
      titleObj.assignees = assignees;
  
      // Match time
      let timeMatch = timeRegex.exec(inputString);
      if (timeMatch) {
        titleObj.time = timeMatch[1].trim();
      }
  
      // Match start date
      let startMatch = startRegex.exec(inputString);
      if (startMatch) {
        titleObj.calendar = { start: startMatch[1].trim() };
      }
  
      // Match end date
      let endMatch = endRegex.exec(inputString);
      if (endMatch) {
        if (!titleObj.calendar) {
          titleObj.calendar = {};
        }
        titleObj.calendar.end = endMatch[1].trim();
      }
  
      result.push(titleObj);
    });
  
    return result;
  }
  export default parseInputString