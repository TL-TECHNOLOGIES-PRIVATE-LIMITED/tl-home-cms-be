const resetAttempts = new Map();

export const checkRateLimit = (email, limit = 3, windowMs = 3600000) => {
    const now = Date.now();
    const attempts = resetAttempts.get(email) || { count: 0, timestamp: now };
    
    // Reset count if window has expired
    if (now - attempts.timestamp >= windowMs) {
        attempts.count = 0;
        attempts.timestamp = now;
    }
    
    attempts.count++;
    resetAttempts.set(email, attempts);
    
    // Clean up old entries periodically
    if (resetAttempts.size > 10000) {
        const oldEntries = [...resetAttempts.entries()]
            .filter(([_, data]) => now - data.timestamp >= windowMs);
        oldEntries.forEach(([key]) => resetAttempts.delete(key));
    }
    
    if (attempts.count > limit) {
        throw new Error('Too many reset attempts. Please try again later.');
    }
};