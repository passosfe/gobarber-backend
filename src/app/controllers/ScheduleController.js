import Appointment from '../models/Appointments';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      req.res(401).json({ error: 'User not provider' });
    }

    const { date } = req.query;

    const parsedDate = parseISO(date);

    const appointments = Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();