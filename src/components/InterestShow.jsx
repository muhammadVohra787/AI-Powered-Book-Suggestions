import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

const interestsData = [
    'Reading',
    'Traveling',
    'Cooking',
    'Music',
    'Sports',
    'Art',
    'Technology',
    'Gardening',
    'Movies',
    'Fitness',
    'Photography',
    'Writing',
    'Gaming',
    'Hiking',
    'Dancing',
    'Volunteering',
    'Crafting',
    'Fashion',
    'Interior Design',
    'Home Improvement',
    'Coding',
    'Learning Languages',
    'Collecting',
    'Knitting',
    'Baking',
    'Meditation',
    'Yoga',
    'Martial Arts',
    'Surfing',
    'Fishing',
    'Camping',
    'Bird Watching',
    'Motorcycling',
    'Travel Blogging',
    'Podcasting',
    'Graphic Design',
    'Animation',
    'Robotics',
    'Web Development',
    'Public Speaking',
    'Stand-Up Comedy',
    'Community Service',
    'History',
    'Philosophy',
    'Astronomy',
    'Science',
    'Environmentalism',
    'Sculpting',
    'Drawing',
    'Video Editing',
    'Music Production',
    'Blockchain Technology',
    'Artificial Intelligence',
    'Cryptocurrency',
    'Social Media Marketing',
    'SEO',
    'Digital Art',
    'Entrepreneurship',
    'Real Estate Investing',
    'Stock Trading',
    'Personal Finance',
    'Health and Nutrition',
    'Pet Care',
    'Home Brewing',
    'Board Games',
    'Web Series',
    'Fashion Designing',
    'Spirituality',
    'Learning to Play an Instrument',
    'Traveling for Food',
    'Culinary Arts',
  ];
  

const InterestShow = ({selectedInterests, setSelectedInterests,searchTerm, setSearchTerm}) => {


  const handleInterestChange = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const filteredInterests = interestsData.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Select Your Interests</Typography>
      <TextField
        variant="outlined"
        placeholder="Search interests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
      />
      <Box>
        {filteredInterests.map((interest) => (
          <FormControlLabel
            key={`${interest.replace(' ','-')}`}
            control={
              <Checkbox
                checked={selectedInterests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
            }
            label={interest}
          />
        ))}
      </Box>
    </Box>
  );
};

export default InterestShow;
