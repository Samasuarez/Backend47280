import { developmentLogger, productionLogger } from '../utils/logger.js';

export const loggerTest = (req, res) => {
    try {
      req.logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;
  
      req.logger.debug('Mensaje de debug');
      req.logger.http('Mensaje de http');
      req.logger.info('Mensaje de información');
      req.logger.warning('Mensaje de advertencia');
      req.logger.error('Mensaje de error');
      req.logger.fatal('Mensaje fatal');
  
      res.send({ message: 'Logger test' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  };
  

