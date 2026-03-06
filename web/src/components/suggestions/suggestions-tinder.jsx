
import { useEffect, useState } from 'react';
import * as ServicesApi from '../../services/api-service';

function Suggestions() {

    const [feedback, setFeedback] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const suggestions = await ServicesApi.getSuggestions();
            setSuggestions(suggestions);
        }

        fetch();
    }, [reload]);

    const handleLiked = async (userId) => {
        const { liked, match } = await ServicesApi.likedUsers(userId);
        
        if (liked) {
            setFeedback({
                type: "like",
                message: "You liked this ❤️"
            });
        }

        if (match) {
            setFeedback({
                type: "match",
                message: "🔥 It's a Match! Start a conversation."
            });
        }

        setReload(prev => !prev);

        setTimeout(() => setFeedback(null), 2000);
    }
    
    const handlePassed = async (userId) => {
        const { passed } = await ServicesApi.passedUsers(userId);
        if (passed) {
            setFeedback({
                type: "pass",
                message: "❌ Profile skipped"
            });
        }

        setReload(prev => !prev);

        setTimeout(() => setFeedback(null), 1500);
    } 

    return (
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">

            {!suggestions || !suggestions.length 
            ? (<> No Suggestions </>) 
            : (
                <>
                    {feedback && (
                        <div
                            className={`animate-fade-in mb-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm
                            ${
                            feedback.type === "like"
                                ? "bg-pink-50 text-pink-600 border border-pink-200"
                                : feedback.type === "match"
                                ? "bg-green-50 text-green-600 border border-green-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                        >
                            {feedback.message}
                        </div>
                    )}

                    <div className="rounded-2xl overflow-hidden mb-4">
                        <img
                        src={ suggestions[0]?.pics?.[0] }
                        alt="profile"
                        className="w-full h-80 object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                        { suggestions[0]?.name }, { suggestions[0]?.age }
                        </h2>

                        <p className="text-gray-500 mt-1">
                        { suggestions[0]?.gender ?? 'Undefined' }
                        </p>

                        <p className="text-gray-400 text-sm mt-2">
                        { suggestions[0]?.bio ?? 'Not description'}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6">
                        <button 
                            className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl hover:bg-gray-300 transition"
                            onClick={ () => handlePassed(suggestions[0]?.id) }
                        >
                        ❌
                        </button>

                        <button 
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl shadow-lg hover:scale-105 transition"
                            onClick={ () => handleLiked(suggestions[0]?.id) }
                        >
                        ❤️
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Suggestions;