import fetchReport from "../helpers/analytics.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper function to handle date range from request or default
const getDateRange = (req) => {
    const { startDate, endDate } = req.query;
    return {
        startDate: startDate || '30daysAgo',
        endDate: endDate || 'today',
    };
};

export const countryAnalytics = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'totalUsers' }],
            [{ name: 'country' }],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No data found for country analytics.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching country analytics data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch country analytics data.'
        });
    }
};

export const activeUsers = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'activeUsers' }],
            [],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No active users data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching active users:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch active users.' 
        });
    }
};

export const engagedSessions = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'engagedSessions' }],
            [],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No engaged sessions data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching engaged sessions:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch engaged sessions.' 
        });
    }
};

export const cityStats = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'activeUsers' }],
            [{ name: 'city' }],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No city statistics found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching city stats:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch city-wise stats.' 
        });
    }
};

export const totalPageViews = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'screenPageViews' }],
            [],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No page view data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching page views:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch total page views.' 
        });
    }
};

export const bounceRate = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'bounceRate' }],
            [],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No bounce rate data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching bounce rate:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch bounce rate.' 
        });
    }
};

export const pageViewsByPage = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [{ name: 'screenPageViews' }], // Changed to array for consistency
            [{ name: 'pagePath' }],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No page-wise view data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching page views by page:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch page views by page.' 
        });
    }
};

export const fullPageData = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [
                { name: 'screenPageViews' },
                { name: 'sessions' },
                { name: 'activeUsers' },
                { name: 'eventCount' },
                { name: 'engagementRate' },
            ],
            [
                { name: 'pagePath' },
                { name: 'pageTitle' },
            ],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No full page data found.' 
            });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching full page data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch full page data.' 
        });
    }
};

export const trafficSources = async (req, res) => {
    try {
        const dateRange = getDateRange(req);
        const result = await fetchReport(
            [
                { name: 'sessions' },
                { name: 'totalUsers' }
            ],
            [
                { name: 'sessionDefaultChannelGroup' }  // GA4's default channel grouping
            ],
            dateRange
        );

        if (!result?.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No traffic sources data found.' 
            });
        }

        // Process data for all main traffic channels
        const processedData = result.map(item => ({
            channel: item.sessionDefaultChannelGroup,
            sessions: parseInt(item.sessions),
            users: parseInt(item.totalUsers)
        })).filter(item => 
            // Include all major traffic channels
            [
                'Organic Search',
                'Paid Search', 
                'Direct',
                'Referral',
                'Social',
                'Email',
                'Display',
                'Affiliates'
            ].includes(item.channel)
        );

        // Calculate total sessions for percentage
        const totalSessions = processedData.reduce((sum, item) => sum + item.sessions, 0);

        // Add percentage to each channel
        const finalData = processedData.map(item => ({
            ...item,
            percentage: ((item.sessions / totalSessions) * 100).toFixed(1)
        }));

        // Sort by number of sessions descending
        finalData.sort((a, b) => b.sessions - a.sessions);

        res.json({ 
            success: true, 
            data: finalData,
            summary: {
                totalSessions,
                totalUsers: finalData.reduce((sum, item) => sum + item.users, 0)
            }
        });
    } catch (error) {
        console.error('Error fetching traffic sources data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch traffic sources data.' 
        });
    }
};
















//
export const totalEnquiries = async (req, res) => {
    try {
        const totalEnquiries = await prisma.enquiries.count();

        return res.status(200).json({
            success: true,
            data: totalEnquiries,
        });
    } catch (error) {
        console.error("Error fetching total enquiries:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const totalNewsletterSubscribers = async (req, res) => {
    try {
        const totalSubscribers = await prisma.newsletter.count();

        return res.status(200).json({
            success: true,
            data: totalSubscribers,
        });
    } catch (error) {
        console.error("Error fetching total newsletter subscribers:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const totalBlogs = async (req, res) => {
    try {
      const totalBlogs = await prisma.blog.count();
  
      return res.status(200).json({
        success: true,
        data: totalBlogs,
      });
    } catch (error) {
      console.error("Error fetching total blog count:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };