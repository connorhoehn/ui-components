// Tests for schemaToJsonPaths — pure schema walker.

import { schemaToJsonPaths } from '../../../lib/schemaToJsonPaths';

// ---------------------------------------------------------------------------
// Detection-regions preset (matches visionSchemaPresets.ts 'detection-regions')
// ---------------------------------------------------------------------------
const DETECTION_REGIONS_SCHEMA = {
  type: 'object' as const,
  required: ['regions', 'caption'],
  properties: {
    regions: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        required: ['label', 'confidence', 'bbox'],
        properties: {
          label:      { type: 'string' as const },
          confidence: { type: 'number' as const },
          bbox: {
            type: 'object' as const,
            properties: {
              x:      { type: 'number' as const },
              y:      { type: 'number' as const },
              width:  { type: 'number' as const },
              height: { type: 'number' as const },
            },
          },
        },
      },
    },
    caption: { type: 'string' as const },
  },
};

// ---------------------------------------------------------------------------
// Multi-label-tags preset (matches visionSchemaPresets.ts 'multi-label-tags')
// ---------------------------------------------------------------------------
const MULTI_LABEL_TAGS_SCHEMA = {
  type: 'object' as const,
  required: ['tags', 'caption'],
  properties: {
    tags: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          tag:        { type: 'string' as const },
          confidence: { type: 'number' as const },
        },
      },
    },
    caption: { type: 'string' as const },
  },
};

describe('schemaToJsonPaths', () => {
  describe('null / empty input', () => {
    it('returns [] for null', () => {
      expect(schemaToJsonPaths(null)).toEqual([]);
    });

    it('returns [] for undefined', () => {
      expect(schemaToJsonPaths(undefined)).toEqual([]);
    });

    it('returns [] for an empty object', () => {
      expect(schemaToJsonPaths({})).toEqual([]);
    });
  });

  describe('flat object schema', () => {
    it('emits one path per top-level property', () => {
      const schema = {
        type: 'object' as const,
        properties: {
          name: { type: 'string' as const },
        },
      };
      const result = schemaToJsonPaths(schema);
      expect(result).toHaveLength(1);
      expect(result[0].path).toBe('$.name');
      expect(result[0].depth).toBe(0);
      expect(result[0].kind).toBe('string');
      expect(result[0].isArrayItems).toBe(false);
    });

    it('emits all properties at depth 0', () => {
      const schema = {
        type: 'object' as const,
        properties: {
          title:  { type: 'string' as const },
          count:  { type: 'number' as const },
          active: { type: 'boolean' as const },
        },
      };
      const result = schemaToJsonPaths(schema);
      expect(result).toHaveLength(3);
      const paths = result.map((r) => r.path);
      expect(paths).toContain('$.title');
      expect(paths).toContain('$.count');
      expect(paths).toContain('$.active');
      expect(result.every((r) => r.depth === 0)).toBe(true);
    });
  });

  describe('nested object schema', () => {
    it('emits both levels with correct depths', () => {
      const schema = {
        type: 'object' as const,
        properties: {
          meta: {
            type: 'object' as const,
            properties: {
              author: { type: 'string' as const },
              year:   { type: 'number' as const },
            },
          },
        },
      };
      const result = schemaToJsonPaths(schema);
      // $.meta, $.meta.author, $.meta.year
      expect(result.length).toBeGreaterThanOrEqual(3);

      const metaEntry = result.find((r) => r.path === '$.meta');
      expect(metaEntry).toBeDefined();
      expect(metaEntry!.depth).toBe(0);
      expect(metaEntry!.kind).toBe('object');

      const authorEntry = result.find((r) => r.path === '$.meta.author');
      expect(authorEntry).toBeDefined();
      expect(authorEntry!.depth).toBe(1);

      const yearEntry = result.find((r) => r.path === '$.meta.year');
      expect(yearEntry).toBeDefined();
      expect(yearEntry!.depth).toBe(1);
    });
  });

  describe('array schema', () => {
    it('emits a [*] path and recurses into items', () => {
      const schema = {
        type: 'object' as const,
        properties: {
          tags: {
            type: 'array' as const,
            items: {
              type: 'object' as const,
              properties: {
                name:  { type: 'string' as const },
                score: { type: 'number' as const },
              },
            },
          },
        },
      };
      const result = schemaToJsonPaths(schema);
      const paths = result.map((r) => r.path);

      // The array itself
      expect(paths).toContain('$.tags');
      // The items wildcard
      expect(paths).toContain('$.tags[*]');
      // Item fields
      expect(paths).toContain('$.tags[*].name');
      expect(paths).toContain('$.tags[*].score');

      const tagsEntry = result.find((r) => r.path === '$.tags');
      expect(tagsEntry!.isArrayItems).toBe(true);

      const starEntry = result.find((r) => r.path === '$.tags[*]');
      expect(starEntry!.isArrayItems).toBe(true);
    });
  });

  describe('detection-regions preset', () => {
    it('emits $.regions at depth 0 with isArrayItems = true', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const regionsEntry = result.find((r) => r.path === '$.regions');
      expect(regionsEntry).toBeDefined();
      expect(regionsEntry!.isArrayItems).toBe(true);
      expect(regionsEntry!.depth).toBe(0);
    });

    it('emits $.regions[*] with isArrayItems = true', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const starEntry = result.find((r) => r.path === '$.regions[*]');
      expect(starEntry).toBeDefined();
      expect(starEntry!.isArrayItems).toBe(true);
    });

    it('emits $.regions[*].label, .confidence, .bbox as children', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const paths = result.map((r) => r.path);
      expect(paths).toContain('$.regions[*].label');
      expect(paths).toContain('$.regions[*].confidence');
      expect(paths).toContain('$.regions[*].bbox');
    });

    it('emits bbox sub-fields', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const paths = result.map((r) => r.path);
      expect(paths).toContain('$.regions[*].bbox.x');
      expect(paths).toContain('$.regions[*].bbox.y');
      expect(paths).toContain('$.regions[*].bbox.width');
      expect(paths).toContain('$.regions[*].bbox.height');
    });

    it('emits $.caption as a leaf', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const captionEntry = result.find((r) => r.path === '$.caption');
      expect(captionEntry).toBeDefined();
      expect(captionEntry!.kind).toBe('string');
      expect(captionEntry!.isArrayItems).toBe(false);
    });

    it('depth ordering: $.regions appears before $.regions[*]', () => {
      const result = schemaToJsonPaths(DETECTION_REGIONS_SCHEMA);
      const regIdx = result.findIndex((r) => r.path === '$.regions');
      const starIdx = result.findIndex((r) => r.path === '$.regions[*]');
      expect(regIdx).toBeLessThan(starIdx);
    });
  });

  describe('multi-label-tags preset', () => {
    it('emits $.tags with isArrayItems = true', () => {
      const result = schemaToJsonPaths(MULTI_LABEL_TAGS_SCHEMA);
      const tagsEntry = result.find((r) => r.path === '$.tags');
      expect(tagsEntry).toBeDefined();
      expect(tagsEntry!.isArrayItems).toBe(true);
    });

    it('emits $.tags[*], $.tags[*].tag, $.tags[*].confidence', () => {
      const result = schemaToJsonPaths(MULTI_LABEL_TAGS_SCHEMA);
      const paths = result.map((r) => r.path);
      expect(paths).toContain('$.tags[*]');
      expect(paths).toContain('$.tags[*].tag');
      expect(paths).toContain('$.tags[*].confidence');
    });

    it('emits $.caption as a non-array leaf', () => {
      const result = schemaToJsonPaths(MULTI_LABEL_TAGS_SCHEMA);
      const captionEntry = result.find((r) => r.path === '$.caption');
      expect(captionEntry!.kind).toBe('string');
      expect(captionEntry!.isArrayItems).toBe(false);
    });
  });

  describe('custom prefix', () => {
    it('respects a custom prefix instead of $', () => {
      const schema = {
        type: 'object' as const,
        properties: { name: { type: 'string' as const } },
      };
      const result = schemaToJsonPaths(schema, '$.steps.myNode.output');
      expect(result[0].path).toBe('$.steps.myNode.output.name');
    });
  });
});
