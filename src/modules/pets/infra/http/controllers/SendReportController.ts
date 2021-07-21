import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendReportService from "../../../services/SendReportService";

export default class SendReportController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { pet_id, user_id, motivation } = request.body;

    const sendReport = container.resolve(SendReportService);

    await sendReport.execute({
      pet_id, user_id, motivation
    });

    return response.status(204).json();
  }
}