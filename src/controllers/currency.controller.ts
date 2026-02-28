import type { Request, Response } from 'express';
import { CurrencyService } from '../services/currency.service.js';

type Params = {
  code: string;
};

const currencyService = new CurrencyService();

export const getAllCurrencies = async (_req: Request, res: Response) => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    return res.status(200).json({
      status: 'success',
      data: currencies,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getCurrencyByCode = async (req: Request<Params>, res: Response) => {
  try {
    const { code } = req.params;
    const currency = await currencyService.getCurrencyByCode(code);
    if (!currency) {
      return res.status(404).json({ status: 'error', message: 'Currency not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: currency,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createCurrency = async (req: Request, res: Response) => {
  try {
    const newCurrency = await currencyService.createCurrency(req.body);
    return res.status(201).json({
      status: 'success',
      data: newCurrency,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateCurrency = async (req: Request<Params>, res: Response) => {
  try {
    const { code } = req.params;
    const updatedCurrency = await currencyService.updateCurrency(code, req.body);
    if (!updatedCurrency) {
      return res.status(404).json({ status: 'error', message: 'Currency not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedCurrency,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteCurrency = async (req: Request<Params>, res: Response) => {
  try {
    const { code } = req.params;
    const deleted = await currencyService.deleteCurrency(code);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Currency not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Currency deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
