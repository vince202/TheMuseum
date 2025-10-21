# Museum Audio Assets

This directory contains all audio files for the Tarot Museum experience.

## Required Audio Files

Place the following audio files in this directory:

### 1. **ambience.mp3** (Background Loop)
- **Purpose**: Continuous ambient background (fireplace crackling, library atmosphere)
- **Duration**: 30-60 seconds (seamless loop)
- **Format**: MP3, 128kbps, stereo
- **Loudness**: -22 LUFS (mastered for background listening)
- **Characteristics**: Warm, subtle, non-intrusive

### 2. **paper.mp3** (Hover Sound)
- **Purpose**: Card hover effect (paper rustle)
- **Duration**: ~0.1 seconds
- **Format**: MP3, 128kbps, mono or stereo
- **Volume**: Quiet, gentle rustle
- **Characteristics**: Short, crisp, paper texture

### 3. **card.mp3** (Click/Select Sound)
- **Purpose**: Card selection effect (card flip)
- **Duration**: ~0.2 seconds
- **Format**: MP3, 128kbps, mono or stereo
- **Volume**: Slightly louder than hover
- **Characteristics**: Satisfying flip, clean cut

### 4. **door.mp3** (Enter/Exit Sound)
- **Purpose**: Navigation transitions (door creak)
- **Duration**: ~0.3 seconds
- **Format**: MP3, 128kbps, mono or stereo
- **Volume**: Medium, atmospheric
- **Characteristics**: Mystical, aged wood creak

## Audio Specifications

### Format Guidelines
- **Container**: MP3
- **Bitrate**: 128kbps (good quality/size balance)
- **Sample Rate**: 44.1kHz or 48kHz
- **Channels**:
  - Ambience: Stereo (for spatial feel)
  - Effects: Mono or Stereo

### Volume Guidelines
- **Ambience**: -22 LUFS (very quiet, background only)
- **Hover**: -18 dB peak (subtle feedback)
- **Click**: -15 dB peak (clear confirmation)
- **Enter**: -12 dB peak (noticeable transition)

### Loop Requirements
- **Ambience MUST loop seamlessly**
- Use crossfade at loop points (0.5-1s overlap)
- No clicks or pops at loop boundary
- Test loop for 5+ minutes to verify smoothness

## Free Audio Resources

### Recommended Sources
1. **Freesound.org** - https://freesound.org
   - Search: "fireplace", "library ambience", "paper rustle", "card flip", "door creak"
   - License: CC0 or CC-BY (attribution may be required)

2. **Zapsplat.com** - https://zapsplat.com
   - High-quality sound effects
   - Free with attribution

3. **BBC Sound Effects** - https://sound-effects.bbcrewind.co.uk
   - Archival recordings
   - Free for personal/educational use

4. **Pixabay Audio** - https://pixabay.com/sound-effects
   - CC0 license (no attribution required)

### Audio Editing Tools
- **Audacity** (Free, open-source) - Loop editing, volume normalization
- **Ocenaudio** (Free) - Simple effects editing
- **REAPER** (Paid, trial available) - Professional DAW

## Technical Implementation

### How Audio is Used

```typescript
// Ambience (continuous loop)
useAudioToggle() hook:
- Loads: /audio/ambience.mp3
- Volume: 0.18 (18%)
- Auto-loops when enabled
- Persists preference in localStorage

// Sound Effects (one-shot)
audioManager.ts:
- paper.mp3: Played on card hover (12% volume)
- card.mp3: Played on card select (15% volume)
- door.mp3: Played on navigation (20% volume)
- Respects user's audio toggle
- Cached for performance
```

### User Control
- Audio is **OFF by default**
- User must manually enable via toggle
- Preference persists across sessions
- Individual volume levels pre-configured

## Testing Audio

### Checklist
- [ ] Ambience loops without gaps/clicks
- [ ] Ambience doesn't overpower UI sounds
- [ ] Hover sound is subtle, not annoying
- [ ] Click sound provides clear feedback
- [ ] Enter sound adds atmosphere without startling
- [ ] All files load quickly (< 100KB each)
- [ ] Test on multiple devices (desktop, mobile)
- [ ] Test in different browsers (Chrome, Safari, Firefox)
- [ ] Verify autoplay blocking handled gracefully

### Browser Autoplay Policies
Modern browsers block autoplay unless:
1. User has interacted with the page
2. Site is added to autoplay whitelist
3. Media is muted

**Our implementation**: Requires user to enable audio via toggle, which provides the necessary interaction for autoplay permission.

## File Size Guidelines
- **ambience.mp3**: < 500KB (30s @ 128kbps)
- **paper.mp3**: < 20KB (very short)
- **card.mp3**: < 30KB (short)
- **door.mp3**: < 40KB (short)

**Total audio budget**: ~600KB

## Attribution
If using CC-BY licensed sounds, add credits to:
`/public/AUDIO_CREDITS.txt`

Example format:
```
"Fireplace Ambience" by SoundArtist (freesound.org)
Licensed under CC-BY 4.0

"Paper Rustle" by FoleyMaster (freesound.org)
Licensed under CC0 1.0
```

---

**Note**: Audio enhances the museum experience but should never be intrusive. When in doubt, err on the side of subtlety. The goal is atmospheric immersion, not demonstration of audio capabilities.
