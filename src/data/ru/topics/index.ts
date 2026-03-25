import { networkingTopics } from './networking';
import { storageTopics } from './storage';
import { cachingTopics } from './caching';
import { scalingTopics } from './scaling';
import { reliabilityTopics } from './reliability';
import { messagingTopics } from './messaging';
import { securityTopics } from './security';
import { patternsTopics } from './patterns';
import type { Topic } from '../../../types';

export const allTopics: Topic[] = [
  ...networkingTopics, ...storageTopics, ...cachingTopics, ...scalingTopics,
  ...reliabilityTopics, ...messagingTopics, ...securityTopics, ...patternsTopics,
];

export const topicById = (id: string): Topic | undefined => allTopics.find((t) => t.id === id);
export const topicsByCategory = (category: string): Topic[] => allTopics.filter((t) => t.category === category);
