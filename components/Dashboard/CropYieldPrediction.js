import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaHistory, FaSpinner } from 'react-icons/fa';

const CropYieldPrediction = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        soil_ph: '',
        rainfall: '',
        temperatures: ['', '', '', '', ''],
        season: ''
    });
    const [predictions, setPredictions] = useState(null);
    const [predictionHistory, setPredictionHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        if (user) {
            fetchPredictionHistory();
        }
    }, [user]);

    const fetchPredictionHistory = async () => {
        try {
            const response = await fetch(`/api/predictions?userId=${user.uid}`);
            if (response.ok) {
                const data = await response.json();
                setPredictionHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch prediction history:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/predict-crop-yield', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId: user?.uid
                }),
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const data = await response.json();
            setPredictions(data);
            await fetchPredictionHistory(); // Refresh history after new prediction
        } catch (err) {
            setError('Failed to get predictions. Please try again.');
            console.error('Prediction error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Crop Yield Prediction
                        </h2>
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                        >
                            <FaHistory />
                            <span>History</span>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!showHistory ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Soil pH Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Soil pH Level
                                </label>
                                <input
                                    type="number"
                                    value={formData.soil_ph}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        soil_ph: e.target.value
                                    }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                    step="0.1"
                                    min="0"
                                    max="14"
                                    required
                                />
                            </div>

                            {/* Rainfall Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Rainfall (mm)
                                </label>
                                <input
                                    type="number"
                                    value={formData.rainfall}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        rainfall: e.target.value
                                    }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Temperature Inputs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last 5 Temperature Readings (°C)
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {formData.temperatures.map((temp, index) => (
                                        <input
                                            key={index}
                                            type="number"
                                            value={temp}
                                            onChange={(e) => {
                                                const newTemps = [...formData.temperatures];
                                                newTemps[index] = e.target.value;
                                                setFormData(prev => ({
                                                    ...prev,
                                                    temperatures: newTemps
                                                }));
                                            }}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                            step="0.1"
                                            placeholder={`Day ${5-index}`}
                                            required
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Season Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Season
                                </label>
                                <select
                                    value={formData.season}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        season: e.target.value
                                    }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                >
                                    <option value="">Select Season</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin mr-2" />
                                        <span>Predicting...</span>
                                    </div>
                                ) : (
                                    'Predict Yield'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4">Prediction History</h3>
                            {predictionHistory.map((pred, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-500">
                                            {new Date(pred.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div>
                                            <span className="text-sm text-gray-600">Soil pH:</span>
                                            <span className="ml-2">{pred.inputs.soil_ph}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Rainfall:</span>
                                            <span className="ml-2">{pred.inputs.rainfall}mm</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="text-sm font-medium text-gray-700">Predictions:</h4>
                                        <div className="mt-1 space-y-1">
                                            {pred.predictions.map((crop, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>{crop.crop_name}</span>
                                                    <span>{crop.predicted_yield.toFixed(2)} tons/hectare</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {predictions && !showHistory && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4">Recommended Crops</h3>
                            <div className="space-y-3">
                                {predictions.map((pred, index) => (
                                    <div key={index} className="p-4 bg-green-50 rounded-lg flex justify-between">
                                        <span className="font-medium">{pred.crop_name}</span>
                                        <span>{pred.predicted_yield.toFixed(2)} tons/hectare</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropYieldPrediction; 