import fs from 'fs';
import path from 'path';

const logMiddleware = (req, res, next) => {
  const logData = {
    ip: req.ip || req.connection.remoteAddress,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  };

  // Log to console
  console.log(`[${logData.timestamp}] ${logData.method} ${logData.url} - IP: ${logData.ip}`);

  // Ensure the logs directory exists
  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // Log to a file
  const logFilePath = path.join(logsDir, 'access.log');
  const logMessage = `[${logData.timestamp}] ${logData.method} ${logData.url} - IP: ${logData.ip}\nHeaders: ${JSON.stringify(logData.headers)}\n\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });

  next();
};

export default logMiddleware;