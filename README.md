# ji-trainer

A project to help people train their ears to recognise Just Intonation notes, and provide statistical measures of how good people are at this.

**Currently this app is WORK-IN-PROGRESS**

## Description of what the app should look like

The app should have ability to keep track of user score, and to give the user sequential tests on Just Intonation intervals.

A test should do the following things:
- Have a set of notes (1 = note, 2 = interval, 3+ = chord)
- Ability to press a button and play these notes
  - Will need to consider suitable timbres
  - Sine wave too simple, and no overlapping partials
  - Square is probably too complex
  - Triangle wave might have about the right number of overtones
  - Also look at FM timbres. Although there are not many sidebands - but can truncate FM to create more sidebands. See web-synth project.
  - For 2+ notes, want to play it twice, first time slowly, second time faster (C--E--G--C--------C-E-G-C)
  - For 1 note, want to precede test with notes at a few random frequencies, to make it a good test of absolute perception, and not just memory of previous note played!
  - 1 note is test of *absolute perception*, 2+ notes is test of *identifying intervals*. These are different types of test!
- A small (3 to 10 option) multiple choice quiz to correctly identify the note, interval or chord
  - For 2+ notes, the bottom note should be given (RCN or Hz), and only the higher notes need to be correctly identified.
- Answers can have any (or all) of the following forms:
  - Absolute values in Hz (400 Hz, 500 Hz, 650 Hz - fix bottom Hz value)
  - RCN note names (C4, E'4, G#''4 - fix bottom RCN name)
  - Whole-number ratios e.g. 17:19 or 5:7:9:13

A score should
- Be a better score for smaller intervals
- Might be related to the minimum number of cents difference a user can reliably distinguish
- You might have multiple scores issued, e.g. one for seconds (approx 200 cents), another for sixths (750 to 950 cent difference), etc.

Some other ideas:
- Lowest note should be randomised, between say C2 and C7
- Might want to keep score separately in ranges C2, G3, C5, C7. Lower frequencies make it harder to distinguish intervals. Higher frequencies miss the overtones.
- Start off with easier tests (wider intervals, greater distance between chord options) and make tests harder until user fails to get any answers right. (Perhaps have 5 'lives', and end game when 5 mistakes are made.)
- Probably don't want to test more than 5 to 8 notes as once - what's the limit?

- If there are 4 options, then there is 25% chance of getting answer right by chance. Before giving someone a particular score, they ought to repeat it 5 times to show its not a fluke
- Analysis of person's results is likely to be highly statistical!

- Might want to upload high scores from each person to somewhere central (Firebase database?) - so only upload reliable statistics that prove what a person knows.
