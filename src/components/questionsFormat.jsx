import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Assuming shadcn/ui or custom
import RecordAnswer from './recordAnswer';
import { TooltipButton } from './tooltipButton';
import { Volume2, VolumeX } from 'lucide-react';

const QuestionsFormat = ({ questions }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(null);

  const handlePlayQuestion = (qst) => {
    if (isPlaying && currentSpeech) {
      // Stop current speech
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={questions?.[0]?.question}>
        <TabsList className="flex overflow-x-auto">
          {questions?.map((tab, i) => (
            <TabsTrigger key={tab.question} value={tab.question}>
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base text-left tracking-wide text-neutral-500 mb-2">
              {tab.question}
            </p>

            <div className="w-full flex items-center justify-end mb-4">
              <TooltipButton
                content={isPlaying ? 'Stop' : 'Start'}
                icon={
                  isPlaying ? (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer
              question={tab}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionsFormat;
