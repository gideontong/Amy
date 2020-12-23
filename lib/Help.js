const { commands } = require('../config/commands.json');

class Help {
    /**
     * Search for a command match
     * @param {Object} filters {name, description: search, or command: match}
     * @returns {Object} First result
     */
    static getCommand(filters) {
        const commands = Help.getCommands(filters);
        if (commands) {
            return commands[0];
        }
    }

    /**
     * Search for commands
     * @param {Object} filters {name, description: search, or command: match}
     * @returns {Object} Results
     */
    static getCommands(filters) {
        if (!filters) return commands;
        if (filters.name) filters.name = filters.name.toLowerCase();
        if (filters.description) filters.description = filters.description.toLowerCase();
        if (filters.command) filters.command = filters.command.toLowerCase();
        let results = [];
        commands.forEach(item => {
            if (filters.name && item.name.toLowerCase().includes(filters.name)) {
                results.push(item);
            } else if (filters.description && item.description.toLowerCase().includes(filters.description)) {
                results.push(item);
            } else if (filters.command && (item.command == filters.command || item.alias.includes(filters.command))) {
                results.push(item);
            }
        });
        return results;
    }
}

module.exports = Help;