import dbConnect from '../../lib/dbConnect';
import Prediction from '../../models/Prediction';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { soil_ph, rainfall, temperatures, season, userId } = req.body;

        // Call Python script with parameters
        const command = `python ML/crop_predictor.py ${soil_ph} ${rainfall} "${temperatures.join(',')}" "${season}"`;
        
        const { stdout, stderr } = await execAsync(command);
        
        if (stderr) {
            console.error('Error:', stderr);
            return res.status(500).json({ error: 'Prediction failed' });
        }

        const predictions = JSON.parse(stdout);

        // Save prediction to MongoDB
        const prediction = await Prediction.create({
            userId,
            inputs: {
                soil_ph,
                rainfall,
                temperatures,
                season
            },
            predictions
        });

        return res.status(200).json(predictions);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// API route to get user's prediction history
export async function getUserPredictions(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const { userId } = req.query;

        const predictions = await Prediction.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        return res.status(200).json(predictions);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch predictions' });
    }
} 