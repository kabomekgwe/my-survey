import { Container, Title, Text, Button, Group, Stack, Card, SimpleGrid } from '@mantine/core';
import { IconChartBar, IconUsers, IconBrandSpeedtest, IconShield } from '@tabler/icons-react';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: IconChartBar,
      title: 'Advanced Analytics',
      description: 'Get deep insights with real-time analytics, custom dashboards, and comprehensive reporting tools.',
    },
    {
      icon: IconUsers,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time collaboration, role-based permissions, and team management.',
    },
    {
      icon: IconBrandSpeedtest,
      title: 'High Performance',
      description: 'Built for scale with optimized performance, fast loading times, and reliable infrastructure.',
    },
    {
      icon: IconShield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encryption, compliance standards, and advanced access controls.',
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" align="center" ta="center">
        {/* Hero Section */}
        <Stack gap="md" maw={600}>
          <Title 
            order={1} 
            size="3.5rem" 
            fw={700}
            className="text-gradient"
          >
            Create Powerful Surveys
          </Title>
          <Text size="xl" c="dimmed" lh={1.6}>
            Build, distribute, and analyze surveys with our comprehensive platform. 
            Combining the best features from leading survey tools with modern design and powerful analytics.
          </Text>
        </Stack>

        {/* CTA Buttons */}
        <Group gap="md">
          <Button 
            component={Link}
            href="/auth/register"
            size="lg" 
            radius="md"
            className="focus-ring"
          >
            Get Started Free
          </Button>
          <Button 
            component={Link}
            href="/auth/login"
            variant="outline" 
            size="lg" 
            radius="md"
            className="focus-ring"
          >
            Sign In
          </Button>
        </Group>

        {/* Features Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mt="xl" w="100%">
          {features.map((feature, index) => (
            <Card key={index} p="lg" radius="lg" className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Stack gap="md" align="center" ta="center">
                <feature.icon size={48} className="text-brand-500" />
                <Title order={3} size="h4" fw={600}>
                  {feature.title}
                </Title>
                <Text size="sm" c="dimmed" lh={1.5}>
                  {feature.description}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Stats Section */}
        <Card w="100%" p="xl" radius="lg" mt="xl" className="glass-effect">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            <Stack gap="xs" align="center">
              <Title order={2} size="2.5rem" fw={700} className="text-gradient">
                15+
              </Title>
              <Text fw={500}>Question Types</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <Title order={2} size="2.5rem" fw={700} className="text-gradient">
                99.9%
              </Title>
              <Text fw={500}>Uptime</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <Title order={2} size="2.5rem" fw={700} className="text-gradient">
                24/7
              </Title>
              <Text fw={500}>Support</Text>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Demo Section */}
        <Stack gap="md" mt="xl" w="100%">
          <Title order={2} ta="center">
            See It In Action
          </Title>
          <Text ta="center" c="dimmed" maw={500} mx="auto">
            Experience the power of our survey platform with interactive demos and real-time previews.
          </Text>
          <Group justify="center" mt="md">
            <Button 
              variant="light" 
              size="md" 
              radius="md"
              className="focus-ring"
            >
              View Demo
            </Button>
            <Button 
              variant="outline" 
              size="md" 
              radius="md"
              className="focus-ring"
            >
              Watch Video
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
}
