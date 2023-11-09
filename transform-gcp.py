#!/usr/bin/env python3
import json
data = open('gcp.tsv').read().split('\n')[1:-1]
dataset = [{'question': q, 'answer': v}for q,v in [d.split('\t')[:2] for d in data]]
with open('gcp.json', 'w') as f:
    f.write(json.dumps(dataset))

