/**
 * A highly optimized Trie (Prefix Tree) implementation for fast 
 * word-level indexing and retrieval of product results.
 */

export class TrieNode {
  children: { [key: string]: TrieNode } = {};
  productSlugs: Set<string> = new Set();
}

export class SearchTrie {
  root: TrieNode = new TrieNode();

  /**
   * Indexes a string of text associated with a specific product slug.
   * Breaks the text into words and inserts each into the Trie.
   */
  insert(text: string, slug: string) {
    const words = text.toLowerCase().split(/[\s,.-/()]+/).filter(Boolean);
    
    for (const word of words) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
        // Add slug to each node in the path to allow prefix matching 
        // (e.g., searching "sou" returns results for "soundproof")
        node.productSlugs.add(slug);
      }
    }
  }

  /**
   * Searches for a prefix and returns the set of matching product slugs.
   */
  search(prefix: string): Set<string> {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return new Set();
      }
      node = node.children[char];
    }
    return node.productSlugs;
  }
}

/**
 * Hook or helper to build and maintain a singleton Trie instance
 * for the product catalog.
 */
let globalTrie: SearchTrie | null = null;

export function getProductTrie(products: any[]) {
  if (globalTrie) return globalTrie;

  const trie = new SearchTrie();
  for (const product of products) {
    const searchableText = [
      product.title,
      product.description,
      product.category,
      ...product.features,
      ...product.applications,
      ...Object.values(product.specifications || {}),
    ].join(' ');
    
    trie.insert(searchableText, product.slug);
  }

  globalTrie = trie;
  return trie;
}
