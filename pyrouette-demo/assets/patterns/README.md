# PyRouette Pattern Library

This directory contains placeholder patterns for the PyRouette Studio Composer.

## Available Patterns

### Classic Pirouette
- Duration: 2.5 seconds
- Type: Turn sequence
- Difficulty: Intermediate

### Grand Arabesque
- Duration: 3.0 seconds
- Type: Balance pose
- Difficulty: Advanced

### Grand Jeté
- Duration: 1.8 seconds
- Type: Leap
- Difficulty: Intermediate

### Fouetté Turn
- Duration: 2.2 seconds
- Type: Turn sequence
- Difficulty: Advanced

### Passé Position
- Duration: 1.5 seconds
- Type: Balance pose
- Difficulty: Beginner

## Pattern Format

Future pattern files will use JSON format:

```json
{
  "name": "Classic Pirouette",
  "duration": 2.5,
  "type": "turn",
  "difficulty": "intermediate",
  "keyframes": [
    { "time": 0, "position": { "x": 0, "y": 0 }, "rotation": 0 },
    { "time": 1.25, "position": { "x": 10, "y": 5 }, "rotation": 180 },
    { "time": 2.5, "position": { "x": 0, "y": 0 }, "rotation": 360 }
  ]
}
```

## Usage

Patterns can be loaded from the sidebar in the PyRouette Studio Composer interface.
