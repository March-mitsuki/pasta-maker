import Head from "next/head";
import { Button, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import { VolumeDown, VolumeUp, PlayArrow } from "@mui/icons-material";
import StopIcon from "@mui/icons-material/Stop";
import { useEffect, useRef, useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MuiLink from "@mui/material/Link";

export default function Home() {
  const [sauceVolume, setSauceVolume] = useState(50);
  const [pastaVolume, setPastaVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSauceVolumeChange = (volume: number | number[]) => {
    setSauceVolume(volume as number);
    sauceRef.current!.volume = sauceVolume / 100;
  };
  const handlePastaVolumeChange = (volume: number | number[]) => {
    setPastaVolume(volume as number);
    pastaRef.current!.volume = pastaVolume / 100;
  };

  const handlePlayBtnClick = () => {
    if (isPlaying) {
      sauceRef.current?.pause();
      meatSauceRef.current?.pause();
    } else {
      sauceRef.current?.play();
      meatSauceRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleMakePastaBtnClick = () => {
    sauceRef.current!.volume = 0;
    meatSauceRef.current!.volume = sauceVolume / 100;

    pastaRef.current?.play();
  };
  const handleMakePastaEnded = () => {
    sauceRef.current!.volume = sauceVolume / 100;
    meatSauceRef.current!.volume = 0;
  };
  const handleSauceEnded = () => {
    setIsPlaying(false);
  };

  const sauceRef = useRef<HTMLAudioElement>(null);
  const meatSauceRef = useRef<HTMLAudioElement>(null);
  const pastaRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    sauceRef.current!.volume = sauceVolume / 100;
    meatSauceRef.current!.volume = 0;
  }, []); // eslint-disable-line

  return (
    <>
      <Head>
        <title>Pasta Maker</title>
        <meta
          name="Pasta Maker"
          content="誰もが美味いパスタを作れるようになります"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <audio
          ref={sauceRef}
          preload="true"
          src="/mp3/sauce.mp3"
          onEnded={handleSauceEnded}
        ></audio>
        <audio
          ref={meatSauceRef}
          preload="true"
          src="/mp3/meat_sauce.mp3"
        ></audio>
        <audio
          ref={pastaRef}
          preload="true"
          src="/mp3/make_pasta.mp3"
          onEnded={handleMakePastaEnded}
        ></audio>

        <Item>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            columns={{ sm: 12, xs: 6 }}
            spacing={2}
            rowSpacing={4}
            padding={4}
          >
            <Grid sm={12} xs={6} fontSize={30} fontWeight={800}>
              ボタンをクリックしてパスタを作ろう！
            </Grid>
            <Grid sm={2} xs={6}>
              <div>ソースボリューム</div>
            </Grid>
            <Grid sm={10} xs={6}>
              <Stack spacing={2} direction="row" alignItems="center">
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={sauceVolume}
                  onChange={(_, v) => handleSauceVolumeChange(v)}
                />
                <VolumeUp />
              </Stack>
            </Grid>
            <Grid sm={2} xs={6}>
              <div>パスタボリューム</div>
            </Grid>
            <Grid sm={10} xs={6}>
              <Stack spacing={2} direction="row" alignItems="center">
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={pastaVolume}
                  onChange={(_, v) => handlePastaVolumeChange(v)}
                />
                <VolumeUp />
              </Stack>
            </Grid>
            <Grid sm={6} xs={6}>
              <Button variant="contained" onClick={handlePlayBtnClick}>
                {isPlaying ? (
                  <>
                    <StopIcon></StopIcon>
                    停止
                  </>
                ) : (
                  <>
                    <PlayArrow></PlayArrow>
                    再生
                  </>
                )}
              </Button>
            </Grid>
            <Grid sm={6} xs={6}>
              <Button variant="contained" onClick={handleMakePastaBtnClick}>
                <LocalDiningIcon />
                作る!
              </Button>
            </Grid>
            <Grid sm={6} xs={6}>
              <MuiLink
                href="https://github.com/March-mitsuki/pasta-maker"
                target="_blank"
              >
                github上でソースコードを見る
              </MuiLink>
            </Grid>
          </Grid>
        </Item>
      </main>
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
