document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('commandInput');
    const output = document.getElementById('output');
    const statusText = document.getElementById('statusText');
    const ipAddress = document.getElementById('ipAddress');
    
    let currentState = 'main';
    let currentUser = '';
    let targetUser = '';
    let targetIP = '';
    let commandHistory = [];
    let historyIndex = -1;
    
    // Generate random IP
    function generateRandomIP() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }
    
    // Set the initial IP
    ipAddress.textContent = generateRandomIP();
    
    // Function to add a line to the console output
    function addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `line ${className}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
        return line;
    }
    
    // Function to simulate typing text character by character
    function typeText(element, text, speed = 30) {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }
    
    // Function to clear the console
    function clearConsole() {
        output.innerHTML = '';
        addLine('CONSOLE CLEARED', 'system');
        addLine('TYPE \'help\' FOR AVAILABLE COMMANDS', 'system');
    }
    
    // Function to display available commands based on current state
    function displayHelp() {
        addLine('AVAILABLE COMMANDS:', 'system');
        
        if (currentState === 'main') {
            addLine('  help - Display this help message', 'system');
            addLine('  clear - Clear the console', 'system');
            addLine('  scan - Scan local network', 'system');
            addLine('  ping [ip] - Ping specified IP address', 'system');
            addLine('  auth login - Authentication login prompt', 'system');
            addLine('  launch [program] - Launch specified program', 'system');
            addLine('  ip trace - Trace current IP connections', 'system');
            addLine('  exit - Exit terminal', 'system');
        } 
        else if (currentState === 'auth') {
            addLine('  user [username] - Enter username', 'system');
            addLine('  password [password] - Enter password', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
        else if (currentState === 'auth_crack') {
            addLine('  activate crack mode - Activate password cracking mode', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
        else if (currentState === 'user_select') {
            addLine('  [username] - Enter target username', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
        else if (currentState === 'security_blocked') {
            addLine('  override security settings - Attempt to override security', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
        else if (currentState === 'override') {
            addLine('  access user [username] at [ip] - Access user at specific IP', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
        else if (currentState === 'password_crack') {
            addLine('  run password crack - Run password cracking algorithm', 'system');
            addLine('  cancel - Return to main menu', 'system');
        }
    }
    
    // Function to handle network scanning animation
    async function scanNetwork() {
        statusText.textContent = 'Scanning';
        
        for (let i = 0; i < 5; i++) {
            const scanLine = addLine(`SCANNING NETWORK SEGMENT ${i+1}/5...`, 'scanning');
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        const devices = Math.floor(Math.random() * 10) + 3;
        addLine(`SCAN COMPLETE. FOUND ${devices} DEVICES:`, 'success');
        
        for (let i = 0; i < devices; i++) {
            const ip = generateRandomIP();
            const deviceTypes = ['Router', 'Server', 'Workstation', 'Mobile Device', 'IoT Device', 'Unknown'];
            const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
            const securityLevels = ['Low', 'Medium', 'High', 'Unknown'];
            const securityLevel = securityLevels[Math.floor(Math.random() * securityLevels.length)];
            
            addLine(`  ${ip} - ${deviceType} - Security: ${securityLevel}`, i === 0 ? 'success' : '');
        }
        
        statusText.textContent = 'Ready';
    }
    
    // Function to ping an IP address
    async function pingIP(ip) {
        statusText.textContent = 'Pinging';
        addLine(`PINGING ${ip}...`, 'system');
        
        for (let i = 0; i < 4; i++) {
            const time = Math.floor(Math.random() * 100) + 10;
            await new Promise(resolve => setTimeout(resolve, 300));
            addLine(`REPLY FROM ${ip}: TIME=${time}ms`, 'system');
        }
        
        const avgTime = Math.floor(Math.random() * 80) + 20;
        addLine(`PING STATISTICS FOR ${ip}:`, 'system');
        addLine(`  Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`, 'system');
        addLine(`  Approximate round trip times:`, 'system');
        addLine(`  Minimum = ${avgTime-10}ms, Maximum = ${avgTime+15}ms, Average = ${avgTime}ms`, 'success');
        
        statusText.textContent = 'Ready';
    }
    
    // Function to trace IP connections
    async function traceIP() {
        statusText.textContent = 'Tracing';
        addLine('TRACING ACTIVE CONNECTIONS...', 'system');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const connections = Math.floor(Math.random() * 5) + 2;
        addLine(`FOUND ${connections} ACTIVE CONNECTIONS:`, 'success');
        
        for (let i = 0; i < connections; i++) {
            const ip = generateRandomIP();
            const ports = ['80', '443', '22', '21', '3389', '8080'];
            const port = ports[Math.floor(Math.random() * ports.length)];
            const status = ['ESTABLISHED', 'LISTENING', 'TIME_WAIT'][Math.floor(Math.random() * 3)];
            
            addLine(`  ${ip}:${port} - ${status}`, i === 0 ? 'success' : '');
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        statusText.textContent = 'Ready';
    }
    
    // Function to simulate password cracking
    async function crackPassword() {
        statusText.textContent = 'Cracking';
        addLine(`STARTING PASSWORD CRACK FOR USER: ${targetUser}`, 'warning');
        addLine(`TARGET IP: ${targetIP}`, 'warning');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        addLine('INITIALIZING DICTIONARY ATTACK...', 'system');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const line = addLine('', 'system');
        await typeText(line, 'ANALYZING PASSWORD PATTERNS...', 20);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine('COMMON PASSWORDS CHECKED: 0/10000', 'system');
        
        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 400));
            addLine(`COMMON PASSWORDS CHECKED: ${i * 2000}/10000`, 'system');
        }
        
        await new Promise(resolve => setTimeout(resolve, 700));
        addLine('SWITCHING TO BRUTE FORCE ATTACK...', 'warning');
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const passLine = addLine('CURRENT ATTEMPT: ', 'system');
        
        for (let i = 0; i < 20; i++) {
            passLine.innerHTML = 'CURRENT ATTEMPT: ';
            for (let j = 0; j < 8; j++) {
                const charSpan = document.createElement('span');
                charSpan.className = 'character blinking';
                charSpan.textContent = chars[Math.floor(Math.random() * chars.length)];
                passLine.appendChild(charSpan);
            }
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        addLine('PASSWORD FOUND!', 'success');
        addLine(`USER: ${targetUser}`, 'success');
        addLine('PASSWORD: ********', 'success');
        addLine('ACCESS GRANTED', 'success');
        
        addLine('', '');
        addLine('WHAT WOULD YOU LIKE TO DO WITH THIS ACCESS?', 'warning');
        addLine('TYPE "help" FOR MORE COMMANDS', 'system');
        
        statusText.textContent = 'Connected';
        currentState = 'main';
    }
    
    // Handle command execution
    function executeCommand(command) {
        addLine(`C:\\HACK> ${command}`);
        
        // Convert command to lowercase for easier comparison
        const cmdLower = command.toLowerCase();
        
        // Handle commands based on current state
        if (currentState === 'main') {
            if (cmdLower === 'help') {
                displayHelp();
            }
            else if (cmdLower === 'clear') {
                clearConsole();
            }
            else if (cmdLower === 'scan') {
                scanNetwork();
            }
            else if (cmdLower.startsWith('ping ')) {
                const ip = command.split(' ')[1];
                pingIP(ip);
            }
            else if (cmdLower === 'auth login') {
                addLine('USER AND PASSWORD REQUIRED', 'system');
                currentState = 'auth';
                statusText.textContent = 'Auth Required';
            }
            else if (cmdLower.startsWith('launch ')) {
                const program = command.split(' ')[1];
                if (program.toLowerCase() === 'auth_crack.exe') {
                    addLine('LAUNCHING AUTH_CRACK.EXE...', 'warning');
                    setTimeout(() => {
                        addLine('AUTH CRACKER LOADED SUCCESSFULLY', 'success');
                        currentState = 'auth_crack';
                        statusText.textContent = 'Crack Ready';
                    }, 1000);
                } else {
                    addLine(`ERROR: PROGRAM '${program}' NOT FOUND`, 'error');
                }
            }
            else if (cmdLower === 'ip trace') {
                traceIP();
            }
            else if (cmdLower === 'exit') {
                addLine('CLOSING SESSION...', 'system');
                setTimeout(() => {
                    addLine('SESSION TERMINATED', 'error');
                    addLine('PRESS ANY KEY TO RESTART', 'system');
                    // We don't actually terminate - just give the illusion
                }, 1000);
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
        else if (currentState === 'auth') {
            if (cmdLower.startsWith('user ')) {
                currentUser = command.split(' ')[1];
                addLine(`USER SET: ${currentUser}`, 'system');
                addLine('PASSWORD REQUIRED', 'system');
            }
            else if (cmdLower.startsWith('password ')) {
                if (currentUser) {
                    addLine('ACCESS DENIED', 'error');
                    addLine('INCORRECT PASSWORD', 'error');
                } else {
                    addLine('ERROR: USER NOT SPECIFIED', 'error');
                }
            }
            else if (cmdLower === 'cancel') {
                addLine('AUTH CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
        else if (currentState === 'auth_crack') {
            if (cmdLower === 'activate crack mode') {
                addLine('CRACK MODE ACTIVATED', 'warning');
                addLine('SELECT USER:', 'system');
                currentState = 'user_select';
            }
            else if (cmdLower === 'cancel') {
                addLine('CRACK CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
        else if (currentState === 'user_select') {
            if (cmdLower === 'cancel') {
                addLine('USER SELECTION CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                targetUser = command;
                addLine(`USER SELECTED: ${targetUser}`, 'system');
                addLine('ACCESS DENIED, BLOCKING IP', 'error');
                ipAddress.textContent = generateRandomIP(); // Change IP after being blocked
                currentState = 'security_blocked';
                statusText.textContent = 'Blocked';
            }
        }
        else if (currentState === 'security_blocked') {
            if (cmdLower === 'override security settings') {
                addLine('ATTEMPTING SECURITY OVERRIDE...', 'warning');
                
                setTimeout(() => {
                    addLine('SECURITY OVERRIDE SUCCESSFUL', 'success');
                    addLine('IP CLOAKING ACTIVATED', 'success');
                    currentState = 'override';
                    statusText.textContent = 'Override Active';
                }, 1500);
            }
            else if (cmdLower === 'cancel') {
                addLine('OPERATION CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
        else if (currentState === 'override') {
            if (cmdLower.startsWith('access user ')) {
                const parts = command.split(' ');
                if (parts.length >= 4 && parts[2] === targetUser) {
                    targetIP = parts[parts.length - 1];
                    addLine(`ACCESSING USER ${targetUser} AT ${targetIP}`, 'warning');
                    
                    setTimeout(() => {
                        addLine('CONNECTION ESTABLISHED', 'success');
                        addLine('AUTHENTICATION BARRIER DETECTED', 'warning');
                        currentState = 'password_crack';
                        statusText.textContent = 'Auth Required';
                    }, 1200);
                } else {
                    addLine('ERROR: INVALID COMMAND FORMAT', 'error');
                    addLine('USAGE: access user [username] at [ip]', 'system');
                }
            }
            else if (cmdLower === 'cancel') {
                addLine('ACCESS CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
        else if (currentState === 'password_crack') {
            if (cmdLower === 'run password crack') {
                crackPassword();
            }
            else if (cmdLower === 'cancel') {
                addLine('PASSWORD CRACK CANCELED', 'system');
                currentState = 'main';
                statusText.textContent = 'Ready';
            }
            else if (cmdLower === 'help') {
                displayHelp();
            }
            else {
                addLine(`COMMAND NOT RECOGNIZED: ${command}`, 'error');
            }
        }
    }
    
    // Event listener for command input
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                executeCommand(command);
                commandInput.value = '';
            }
        }
        // Command history navigation
        else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        }
        else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
            e.preventDefault();
        }
    });
    
    // Auto-focus the input field
    commandInput.focus();
    
    // Keep focus on input field when clicking anywhere in the console
    document.querySelector('.console').addEventListener('click', function() {
        commandInput.focus();
    });
});
