import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Word } from '../../utils/types/Word';
import { getWordsAsync } from '../../store/word/wordAsync';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';

const DictionnaryLayout: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const [words, setWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc =
    words.length > 0
      ? words[0].phonetics.find((phonetic) => phonetic.audio)?.audio || ''
      : '';

  const getWordsRequest = useAppSelector((state) => state.word.getWords);

  // Fetch words based on current search term
  const fetchWords = (searchTerm: string) => {
    dispatch(getWordsAsync(searchTerm));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Only fetch new words if there is a search term
    if (search.trim()) {
      fetchWords(search);
    }
  };

  React.useEffect(() => {
    if (getWordsRequest.status === ReduxStatus.Succeeded) {
      setWords(getWordsRequest.data);
    }
  }, [getWordsRequest]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          sx={{ backgroundColor: 'rgb(244, 244, 244)' }}
        />
      </Box>
      {words.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '50px',
              }}
            >
              <Box>
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onEnded={handleEnded}
                />
                <Typography variant="h4">{words[0]?.word}</Typography>
                <Typography variant="h6" sx={{ color: '#9e58da' }}>
                  {words[0].phonetic}
                </Typography>
              </Box>
              <Button
                sx={{
                  color: '#9e58da',
                  background: '#e9d0fa',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                }}
                onClick={toggleAudio}
              >
                {isPlaying ? (
                  <PauseIcon
                    fontSize="large"
                    sx={{ height: '40px', width: '40px' }}
                  />
                ) : (
                  <PlayArrowIcon
                    fontSize="large"
                    sx={{ height: '40px', width: '40px' }}
                  />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Loading data or no results available.
        </Typography>
      )}
      {/* Render meanings and other details */}
      <Box>
        {words.map((word, wordIndex) => (
          <Box key={wordIndex}>
            {word.meanings.map((meaning, meaningIndex) => (
              <Box key={meaningIndex} sx={{ marginBottom: '40px' }}>
                <Typography
                  sx={{
                    fontFamily: 'Caveat, cursive !important',
                    fontWeight: 700,
                    fontSize: '30px',
                    marginRight: '10px',
                  }}
                  variant="body2"
                >
                  {meaning.partOfSpeech}
                </Typography>
                <hr
                  style={{
                    width: '100%',
                    flex: 1,
                    border: 'none',
                    borderTop: '1px solid #ccc',
                  }}
                />
                <Box sx={{ marginTop: '30px' }}>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgb(157, 157, 157)' }}
                  >
                    Meaning
                  </Typography>
                  <Box>
                    <List sx={{ width: '100%', maxWidth: 360 }}>
                      {meaning.definitions.map((definition, defIndex) => (
                        <Box key={`${meaningIndex}-${defIndex}`}>
                          <ListItem>
                            <ListItemIcon>
                              <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary={definition.definition} />
                          </ListItem>
                          {definition.example ? (
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgb(157, 157, 157)',
                                marginLeft: '80px',
                              }}
                            >
                              "{definition.example}"
                            </Typography>
                          ) : null}
                        </Box>
                      ))}
                    </List>
                  </Box>
                  {meaning.synonyms.length > 0 && (
                    <>
                      <Typography
                        variant="body1"
                        sx={{ color: 'rgb(157, 157, 157)', display: 'inline' }}
                      >
                        Synonyms:{' '}
                      </Typography>
                      {meaning.synonyms.map((synonym, synIndex) => (
                        <Typography
                          key={synIndex}
                          sx={{
                            color: '#9e58da',
                            fontWeight: 700,
                            display: 'inline',
                            marginRight: 1,
                          }}
                        >
                          {synonym}
                          {synIndex < meaning.synonyms.length - 1 && ' |'}
                        </Typography>
                      ))}
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        <hr
          style={{
            width: '100%',
            border: 'none',
            borderTop: '1px solid #ccc',
            margin: '30px 0 15px 0',
          }}
        />
        {words.length > 0 &&
          words[0].sourceUrls &&
          words[0].sourceUrls.length > 0 && (
            <Typography sx={{ color: 'rgb(157, 157, 157)', display: 'inline' }}>
              Source :{' '}
              <a
                href={words[0].sourceUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#9e58da',
                  display: 'inline',
                }}
              >
                {words[0].sourceUrls[0]}
                <OpenInNewIcon
                  sx={{ verticalAlign: 'middle', marginLeft: '10px' }}
                  fontSize="small"
                />
              </a>
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export default DictionnaryLayout;
