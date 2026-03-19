<?php

namespace App\Services;

use Smalot\PdfParser\Parser;
use Illuminate\Http\UploadedFile;
use Exception;

class ResumeParserService
{
    protected $parser;

    public function __construct()
    {
        $this->parser = new Parser();
    }

    public function parse(UploadedFile $file): array
    {
        if ($file->getMimeType() !== 'application/pdf') {
            // Return empty structure instead of throwing hard error, allowing manual fill
            return $this->getEmptyData("Invalid file type. Only PDF is supported.");
        }

        try {
            $pdf = $this->parser->parseFile($file->getPathname());
            $text = $pdf->getText();

            return $this->extractData($text);
        } catch (Exception $e) {
            // Log error but return empty data so frontend doesn't crash
            \Log::error("Resume parsing failed: " . $e->getMessage());
            return $this->getEmptyData("Parsing failed. Please enter details manually.");
        }
    }

    protected function getEmptyData(?string $error = null): array
    {
        return [
            'email' => null,
            'skills' => [],
            'experience_years' => 0,
            'error' => $error
        ];
    }

    protected function extractData(string $text): array
    {
        return [
            'email' => $this->extractEmail($text),
            'skills' => $this->extractSkills($text),
            'experience_years' => $this->extractExperienceYears($text),
            // 'education' => $this->extractEducation($text), // Complex, maybe simplifed version later
            // 'raw_text' => $text
        ];
    }

    protected function extractEmail(string $text): ?string
    {
        preg_match('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', $text, $matches);
        return $matches[0] ?? null;
    }

    protected function extractSkills(string $text): array
    {
        // Basic list of common tech skills to look for
        $commonSkills = [
            'PHP',
            'Laravel',
            'JavaScript',
            'React',
            'Vue',
            'Node.js',
            'Python',
            'Django',
            'Java',
            'Spring',
            'C#',
            '.Net',
            'SQL',
            'MySQL',
            'PostgreSQL',
            'Docker',
            'AWS',
            'Git',
            'HTML',
            'CSS',
            'Tailwind',
            'Bootstrap',
            'TypeScript',
            'Redux',
            'GraphQL'
        ];

        $foundSkills = [];
        $textLower = strtolower($text);

        foreach ($commonSkills as $skill) {
            if (str_contains($textLower, strtolower($skill))) {
                $foundSkills[] = $skill;
            }
        }

        return $foundSkills;
    }

    protected function extractExperienceYears(string $text): ?int
    {
        // Very naive heuristic: look for "X years" or date ranges
        // Start with simple regex for "X years"
        preg_match('/(\d+)\+?\s*years?/i', $text, $matches);
        if (isset($matches[1])) {
            return (int) $matches[1];
        }

        // Fallback: Count year occurrences or use date math (too complex for regex only)
        return null;
    }
}
