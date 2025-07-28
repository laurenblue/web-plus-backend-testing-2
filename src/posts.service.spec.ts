import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result.length).toBe(4);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2', 'Post 3', 'Post 4']);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result.length).toBe(2);
      expect(result.map(p => p.text)).toEqual(['Post 2', 'Post 3']);
    });

    it('should return only limited number of posts if limit is set', () => {
      const result = postsService.findMany({ limit: 2 });
      expect(result.length).toBe(2);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2']);
    });

    it('should skip posts correctly if skip is set', () => {
      const result = postsService.findMany({ skip: 3 });
      expect(result.length).toBe(1);
      expect(result[0].text).toBe('Post 4');
    });

    it('should return empty array if skip is greater than number of posts', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result).toEqual([]);
    });

    it('should return empty array if no posts exist', () => {
      const emptyService = new PostsService();
      const result = emptyService.findMany();
      expect(result).toEqual([]);
    });

    it('should return empty array if limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });
      expect(result).toEqual([]);
    });

    it('should ignore negative skip and limit values', () => {
      const result = postsService.findMany({ skip: -2, limit: -5 });
      expect(result.length).toBe(4);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2', 'Post 3', 'Post 4']);
    });
  });
});
